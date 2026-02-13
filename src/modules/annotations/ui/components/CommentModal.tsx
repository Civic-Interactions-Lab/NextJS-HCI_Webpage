import React, { useState, useEffect, useRef } from "react";
import { X, Send, MoreHorizontal, Check, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { Annotation } from "@/modules/annotations/hooks/useAnnotations";
import {
  categoryConfig,
  CategoryType,
} from "@/modules/annotations/config/categoryConfig";

interface CommentModalProps {
  annotation?: Annotation;
  isNewAnnotation?: boolean;
  isPopover?: boolean;
  onSubmit?: (content: string, category: CategoryType) => void;
  onCancel?: () => void;
  onClose?: () => void;
  onAddComment?: (content: string) => void;
  onToggleResolved?: () => void;
  onDelete?: () => void;
}

const CommentModal = ({
  annotation,
  isNewAnnotation = false,
  isPopover = false,
  onSubmit,
  onCancel,
  onClose,
  onAddComment,
  onToggleResolved,
  onDelete,
}: CommentModalProps) => {
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState<CategoryType>("other");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const commentsScrollRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const isAnnotationCreator = user?.id === annotation?.authorId;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (
      commentsScrollRef.current &&
      annotation?.comments &&
      annotation.comments.length > 0
    ) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (commentsScrollRef.current) {
            commentsScrollRef.current.scrollTop =
              commentsScrollRef.current.scrollHeight;
          }
        });
      });
    }
  }, [annotation?.comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (isNewAnnotation && onSubmit) {
      onSubmit(comment, category);
    } else if (onAddComment) {
      onAddComment(comment);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (commentsScrollRef.current) {
            commentsScrollRef.current.scrollTo({
              top: commentsScrollRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        });
      });
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 50);
    }

    setComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Backdrop - only show when not in popover mode */}
      {!isPopover && (
        <div
          className="fixed inset-0 bg-black/10 z-9999"
          onClick={isNewAnnotation ? onCancel : onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`${isPopover ? "" : "fixed bottom-20 right-4 left-4 md:left-auto z-10000"} pointer-events-auto`}
      >
        <Card
          ref={modalRef}
          data-comment-modal
          className="w-full md:max-w-lg border-2 border-border overflow-hidden pb-0"
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-sm">
                {isNewAnnotation ? "Feedback" : "Comments"}
              </h3>
              {annotation && !isNewAnnotation && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="gap-1">
                    {React.createElement(
                      categoryConfig[annotation.category].icon,
                      {
                        className: `w-3 h-3 ${categoryConfig[annotation.category].textColor}`,
                      },
                    )}
                    <span className="text-xs capitalize">
                      {categoryConfig[annotation.category].label}
                    </span>
                  </Badge>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {annotation && !isNewAnnotation && isAnnotationCreator && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-10001">
                    <DropdownMenuItem
                      onClick={() => onToggleResolved?.()}
                      className="cursor-pointer"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {annotation.resolved ? "Unresolve" : "Resolve"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete?.()}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={isNewAnnotation ? onCancel : onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col max-h-72">
            {/* Existing comments */}
            {annotation && !isNewAnnotation && (
              <div
                ref={commentsScrollRef}
                className="flex-1 overflow-y-auto px-6 py-4"
              >
                {/* Original comment */}
                <div className="pb-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      {annotation.authorImageUrl ? (
                        <AvatarImage
                          src={annotation.authorImageUrl}
                          alt={annotation.authorName}
                        />
                      ) : null}
                      <AvatarFallback
                        className={
                          user?.id === annotation.authorId
                            ? "bg-blue-500 text-white text-sm"
                            : "bg-muted text-sm"
                        }
                      >
                        {annotation.authorName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {annotation.authorName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {annotation.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">
                        {annotation.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional comments */}
                {annotation.comments.map((comment, index) => (
                  <div
                    key={`${comment.id}-${index}`}
                    className="pt-4 border-t border-border/50"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        {comment.authorImageUrl ? (
                          <AvatarImage
                            src={comment.authorImageUrl}
                            alt={comment.authorName}
                          />
                        ) : null}
                        <AvatarFallback
                          className={
                            user?.id === comment.authorId
                              ? "bg-blue-500 text-white text-sm"
                              : "bg-muted text-sm"
                          }
                        >
                          {comment.authorName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            {comment.authorName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {comment.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment form - fixed at bottom */}
            {!annotation?.resolved && (
              <div className="border-t border-border shrink-0">
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {isNewAnnotation && (
                    <>
                      {/* User Info */}
                      <div className="flex items-center space-x-3 pb-3 border-b border-border/50">
                        <Avatar className="h-10 w-10">
                          {user?.imageUrl ? (
                            <AvatarImage
                              src={user.imageUrl}
                              alt={user.firstName || "User"}
                            />
                          ) : null}
                          <AvatarFallback className="bg-blue-500 text-white">
                            {user?.firstName?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {user?.firstName && user?.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user?.firstName
                                ? user.firstName
                                : user?.emailAddresses?.[0]?.emailAddress
                                  ? user.emailAddresses[0].emailAddress
                                  : "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user?.emailAddresses?.[0]?.emailAddress}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={category}
                          onValueChange={(value) =>
                            setCategory(value as CategoryType)
                          }
                        >
                          <SelectTrigger className="w-full border-gray-400/80">
                            <SelectValue>
                              <div className="flex items-center space-x-2">
                                {React.createElement(
                                  categoryConfig[category].icon,
                                  {
                                    className: `w-4 h-4 ${categoryConfig[category].textColor}`,
                                  },
                                )}
                                <span>{categoryConfig[category].label}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent
                            className="max-h-[200px] overflow-y-auto z-10001 w-full border-gray-400/80"
                            position="popper"
                            sideOffset={4}
                          >
                            {Object.entries(categoryConfig).map(
                              ([key, config]) => {
                                const Icon = config.icon;
                                return (
                                  <SelectItem
                                    key={key}
                                    value={key}
                                    className="cursor-pointer"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <Icon
                                        className={`w-2.5 h-2.5 ${config.textColor}`}
                                      />
                                      <span>{config.label}</span>
                                    </div>
                                  </SelectItem>
                                );
                              },
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="space-y-4">
                    <div className="relative">
                      <Textarea
                        id="comment"
                        ref={textareaRef}
                        placeholder={
                          isNewAnnotation
                            ? "Add a comment..."
                            : "Add another comment..."
                        }
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={3}
                        className="resize-none pr-12 border-gray-400/80"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!comment.trim()}
                        className="absolute bottom-2 right-2 h-8 w-8"
                      >
                        <Send className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {annotation?.resolved && (
              <div className="p-6 text-center border-t border-border shrink-0">
                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700"
                >
                  ✓ This comment has been resolved
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CommentModal;
