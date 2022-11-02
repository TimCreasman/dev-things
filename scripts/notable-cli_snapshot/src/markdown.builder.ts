export class MarkdownBuilder {
    private readonly _file: MarkdownFile;

    constructor() {
      this._file = {
        title: new MarkdownTitle(''),
        header: new MarkdownMetaHeader('', []),
        date: new MarkdownDate(new Date()),
      };
    }

    withMetaHeader(title: string, tags: string[]): this {
      this._file.header = new MarkdownMetaHeader(title, tags);
      return this;
    }

    withTitle(title: string): this {
      this._file.title = new MarkdownTitle(title);
      return this;
    }

    withDate(date: Date): this {
      this._file.date = new MarkdownDate(date);
      return this;
    }

    build(): MarkdownFile {
      return this._file;
    }

    toString(): string {
      return this._file.header.toString() + this._file.title.toString() + this._file.date.toString();
    }
}

export interface MarkdownFile {
    title: MarkdownTitle;
    header: MarkdownMetaHeader;
    date: MarkdownDate;
}

class MarkdownMetaHeader {
    title: string = '';
    tags: string[] = [];
    created: Date;
    modified: Date;

    constructor(title: string, tags: string[]) {
      this.title = title;
      this.tags = tags;
      this.created = new Date();
      this.modified = new Date();
    }

    toString() {
      return '---\n' +
            `title: ${this.title}\n` +
            `tags: [${this.tags.toString()}]\n` +
            `created: ${this.created.toISOString()}\n` +
            `modified: ${this.modified.toISOString()}\n` +
            '---\n';
    }
}

class MarkdownTitle {
    title = '';

    constructor(title: string) {
      this.title = title;
    }

    toString() {
      return `# ${this.title}\n`;
    }
}

class MarkdownDate {
    date: Date;

    constructor(date: Date) {
      this.date = date;
    }

    toString() {
      return `> ${this.date.toLocaleString()}\n`;
    }
}
