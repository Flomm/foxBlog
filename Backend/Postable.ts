export default interface Postable {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  score: number;
  user?: string;
  vote?: string;
}
