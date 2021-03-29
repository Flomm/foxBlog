export default interface Postable {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  user?: string;
  vote?: string;
}
