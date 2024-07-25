import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardsComponent } from "./ui/cards/cards.component";
import { products } from './interface/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project2';
  categorizedProducts: { [key: string]: products[] } = {};
  async ngOnInit(){
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      this.categorizeProducts(data.products);

    } catch (error) {
      console.log(error);
    }
  }
  categorizeProducts(products: products[]) {
    this.categorizedProducts = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as { [key: string]: products[] });
  }

  getCategories(): string[] {
    return Object.keys(this.categorizedProducts);
  }

  getProductsByCategory(category: string): products[] {
    return this.categorizedProducts[category];
  }
}
