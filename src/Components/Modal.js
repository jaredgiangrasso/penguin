export function Modal({ match, history }) {
  let cover = this.props.bookList[parseInt(match.params.id, 10)];

  if (!cover) return null;

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

}