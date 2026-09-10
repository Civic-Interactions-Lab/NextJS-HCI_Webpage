import { useEffect, useState } from "react";
import { useClient, useFormValue } from "sanity";
import { usePaneRouter } from "sanity/structure";
import type { StringInputProps } from "sanity";
import { apiVersion } from "@/sanity/env";

/**
 * Custom input for the `people.association` field. Renders the normal
 * dropdown, then — the moment someone is switched to "Alumni" — shows an
 * inline banner right there in the form to create (or open) their linked
 * `alumniProfile` document, so there's no need to dig through the document
 * actions menu.
 */
export function AssociationInput(props: StringInputProps) {
  const { value, renderDefault } = props;
  const rawId = useFormValue(["_id"]) as string | undefined;
  const documentId = rawId?.replace(/^drafts\./, "");
  const client = useClient({ apiVersion });
  const { navigateIntent } = usePaneRouter();

  const [profileId, setProfileId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (value !== "alumni" || !documentId) {
      setChecked(false);
      setProfileId(null);
      return;
    }

    let cancelled = false;
    setChecked(false);

    client
      .fetch<string | null>(
        `*[_type == "alumniProfile" && person._ref == $id][0]._id`,
        { id: documentId },
      )
      .then((id) => {
        if (!cancelled) {
          setProfileId(id);
          setChecked(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [client, documentId, value]);

  const handleCreate = async () => {
    if (!documentId) return;
    setIsBusy(true);
    try {
      const created = await client.create({
        _type: "alumniProfile",
        person: { _type: "reference", _ref: documentId },
      });
      navigateIntent("edit", { id: created._id, type: "alumniProfile" });
    } finally {
      setIsBusy(false);
    }
  };

  const handleOpen = () => {
    if (profileId) {
      navigateIntent("edit", { id: profileId, type: "alumniProfile" });
    }
  };

  return (
    <div>
      {renderDefault(props)}
      {value === "alumni" && documentId && checked && (
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid rgba(41, 39, 39, 0.15)",
            background: profileId ? "rgba(2, 134, 131, 0.08)" : "rgba(226, 149, 0, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13 }}>
            {profileId
              ? "This person has a linked Alumni Profile."
              : "No Alumni Profile yet — create one to set their current status."}
          </span>
          <button
            type="button"
            onClick={profileId ? handleOpen : handleCreate}
            disabled={isBusy}
            style={{
              flexShrink: 0,
              fontSize: 13,
              fontWeight: 600,
              padding: "5px 12px",
              borderRadius: 4,
              border: "none",
              background: "#AA2C45",
              color: "white",
              cursor: isBusy ? "default" : "pointer",
              opacity: isBusy ? 0.6 : 1,
            }}
          >
            {profileId ? "Open →" : isBusy ? "Creating…" : "Create Alumni Profile"}
          </button>
        </div>
      )}
    </div>
  );
}
