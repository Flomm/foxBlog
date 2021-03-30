export default interface Postable {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: number;
  score: number;
  user?: string;
  vote?: string;
}
