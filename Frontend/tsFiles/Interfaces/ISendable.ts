export default interface Sendable {
  author: string;
  title: string;
  content: string;
  timestamp: number;
  user?: string;
  vote?: string;
}
