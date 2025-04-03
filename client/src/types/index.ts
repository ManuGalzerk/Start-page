export type Bookmark = {
  id: number;
  name: string;
  url: string;
  category: string;
  icon: string;
};

export type Category = {
  id: number;
  name: string;
}

export interface AddBookmarkFormData {
  name: string;
  url: string;
  category: string;
  icon: string;
}
