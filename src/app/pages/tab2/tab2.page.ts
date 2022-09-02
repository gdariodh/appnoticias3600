import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  categories: string[] = ['business','entertainment','general','health','science','sports','technology']
  selectedCategory: string = this.categories[0]

  constructor(private newsService: NewsService) {}
  articles: Article[] = [];
  page: number = 1;
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;



  ngOnInit() {
    this.newsService.getTopHeadLines(this.page, this.selectedCategory).subscribe((resp) => {
      console.log(resp.articles);

      this.articles = resp.articles;
    })
  }

  segmentChanged(event:any){

    this.selectedCategory = event.detail.value;

  this.newsService.getTopHeadLines(this.page, this.selectedCategory).subscribe((resp) => {
    console.log(resp.articles);

    this.articles = resp.articles;
  })
  }

  loadData(event:any){
    this.page += 1

    this.newsService.getTopHeadLines(this.page, this.selectedCategory).subscribe((resp) => {

      if(resp.articles.length === 0){
        this.infiniteScroll.disabled = true;
        return;
      }

      this.articles = [...this.articles,...resp.articles];
      this.infiniteScroll.complete()
    })
  }
}
