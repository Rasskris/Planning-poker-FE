interface readTextFileProps {
  event: React.ChangeEvent<HTMLInputElement>;
}

export class ReadIssueList {
  static reader = new FileReader();
  static resultReader = '';

  static readIssueListFromFile({ event }: readTextFileProps) {
    const loaderElem = event.target as HTMLInputElement;
    if (loaderElem.files === null) return;
    const file = loaderElem.files[0];
    let reader = new FileReader();

    reader.onload = function () {
      ReadIssueList.resultReader = reader.result as string;
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
    reader.readAsText(file);
  }
}
