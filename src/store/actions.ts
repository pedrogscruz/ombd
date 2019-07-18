import { action, observable } from "mobx";
import axios, { AxiosResponse } from "axios";

import { movie } from "types/ombd";

class Actions {
  @observable result:movie[] = [];
  @observable selectedMovie:movie|null = null;
  title: string = '';
  s_title: string = '';
  page: string = '1';
  s_page: string = '1';
  total: number = 0;
  searching: boolean = false;

  isNewSearchDifferent = () => this.title !== this.s_title || this.page !== this.s_page;

  @action queryQueue = (key: 'title'|'page', value: string) => {
    this[key] = value;
    if (this.searching)
      return;
    if (this.isNewSearchDifferent())
      this.callQuery();
  }

  callQuery = () => {
    this.searching = true;
    this.s_title = this.title;
    this.s_page = this.page;
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=6cf06e4e&s=${this.title}&page=${this.page}`;
    axios.get(url)
      .then((response: AxiosResponse<{Search: movie[], totalResults: string, Response: string}>) => {
        if (response.data.Response === "True" && response.data.Search) {
          this.total = parseInt(response.data.totalResults);
          this.result = response.data.Search;
        }
        else {
          this.total = 0;
          this.result = [];
        }
        if (this.isNewSearchDifferent())
          this.callQuery();
        else
          this.searching = false;
    });
  }
}

const actions = new Actions()

export default actions;