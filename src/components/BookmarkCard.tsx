import React from "react";
import { Bookmark } from "../types";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  return (
    <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
      <div className="bookmark-card">
        {!bookmark.icon && <span className="icon" />}
        {bookmark.icon && <img src={bookmark.icon} alt={bookmark.title} className="icon-image" />}

        <div className="info">
          <h3 className="title">{bookmark.title}</h3>
          <p className="url">{bookmark.url}</p>
        </div>

        {/* {bookmark.meta?.description && <p className="text-sm mt-2">{bookmark.meta.description}</p>} */}
      </div>
    </a>
  );
};

export default BookmarkCard;
