export default function scrollToPost(post: HTMLDivElement): void {
  const headerHeight: number = 50;
  const screenHalf: number = window.screen.height / 2;
  const y: number = post.getBoundingClientRect().bottom + window.scrollY - headerHeight - screenHalf;
  window.scroll({
    top: y,
    behavior: 'smooth',
  });
}
