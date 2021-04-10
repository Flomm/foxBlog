export default interface IPostable {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: number;
  score: number;
  user?: string;
  vote?: string;
}
