import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-astronauts-list',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage,FontAwesomeModule,RouterLink],
  templateUrl: './astronauts-list.component.html',
  styleUrl: './astronauts-list.component.css'
})
export class AstronautsListComponent {

  faArrowRight = faArrowRight;

  sampleImages : {imgURL:string,nationality:string}[] = [
    {imgURL:"https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/astronaut_images/walter_villadei_image_20230626124317.png",nationality:'French'},
    {imgURL:"https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/astronaut_images/anastatia_mayer_image_20230718080218.png",nationality:'India'},
    {imgURL:"https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/astronaut_images/abdul2520ahad2520mohmand_image_20181201175826.jpg",nationality:'USA'},
    {imgURL:"https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/astronaut_images/aleksandr2520aleksandrovich2520volkov_image_20181201224523.jpg",nationality:'Russia'},
    {imgURL:"https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/astronaut_images/aleksandr2520kaleri_image_20181129232134.jpg",nationality:'UAE'},
    {imgURL:"https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/astronaut_images/alexander_grebe_image_20230304134134.jpeg",nationality:'Australia'},
    {imgURL:"https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/astronaut_images/ali_alqarni_image_20230213181809.jpg",nationality:'USA'},
    {imgURL:"https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/astronaut_images/anatoli_ivanish_image_20200402084238.jpg",nationality:'French'}
    
  ];

}
