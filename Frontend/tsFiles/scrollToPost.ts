export default function scrollToPost(post: HTMLDivElement): void {
  const headerHeight = 50;
  const screenHalf = window.screen.height / 2;
  const y: number = post.getBoundingClientRect().top + window.scrollY - headerHeight - screenHalf;
  window.scroll({
    top: y,
    behavior: 'smooth',
  });
}
