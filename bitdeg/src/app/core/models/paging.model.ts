/**Class intended to handle server pagination responses and pagination request parameters to server
 * without having to manually enter pagination request params
 */
class PageSearch<T> {
  page: Paging = new Paging();
  data!: T;

  constructor(d: T) {
    this.data = d || null;
  }
}

class Paging {
  find: string;
  order: string;
  constructor() {
    this.find = ""; //search
    this.order = "-id";
  }
}

export { PageSearch, Paging };
