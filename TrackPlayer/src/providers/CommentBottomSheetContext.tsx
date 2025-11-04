import CommentBottomSheet from "@/src/components/common/CommentBottomSheet";
import { createContext, ReactNode, useContext, useState } from "react";
import { Comment } from "../constants/types";

type CommentTarget = {
  type: "track" | "post";
  id: string;
};

type CommentContextProps = {
  openCommentSheet: (target: CommentTarget, comments: Comment[]) => void;
  closeCommentSheet: () => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  comments: Comment[];
  target: CommentTarget | null;
};

const CommentSheetContext = createContext<CommentContextProps>({
  openCommentSheet: () => {},
  closeCommentSheet: () => {},
  setComments: () => {},
  comments: [],
  target: null,
});

export const useCommentSheet = () => useContext(CommentSheetContext);

export function CommentSheetProvider({ children }: { children: ReactNode }) {
  const [openFn, setOpenFn] = useState<() => void>(() => {});
  const [closeFn, setCloseFn] = useState<() => void>(() => {});
  const [comments, setComments] = useState<Comment[]>([]);
  const [target, setTarget] = useState<CommentTarget | null>(null);

  return (
    <CommentSheetContext.Provider
      value={{
        openCommentSheet: (newTarget, newComments) => {
          setTarget(newTarget);
          setComments(newComments);
          openFn();
        },
        closeCommentSheet: () => closeFn(),
        setComments,
        comments,
        target,
      }}
    >
      {children}

      <CommentBottomSheet
        onMount={({ open, close }) => {
          setOpenFn(() => open);
          setCloseFn(() => close);
        }}
        comments={comments}
      />
    </CommentSheetContext.Provider>
  );
}
