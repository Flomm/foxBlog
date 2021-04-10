export default interface IPostable {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: number;
  score: number;
  author_id?: number;
  user?: string;
  vote?: number;
}
