import React from "react";
import { Bookmark } from "../types";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow hover:shadow-lg transition">
      <img src={bookmark.icon} alt={bookmark.title} className="w-12 h-12 mb-2" />
      <h3 className="text-lg font-bold">{bookmark.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{bookmark.url}</p>
      {bookmark.meta?.description && <p className="text-sm mt-2">{bookmark.meta.description}</p>}
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-500">
        Visit
      </a>
    </div>
  );
};

export default BookmarkCard;
