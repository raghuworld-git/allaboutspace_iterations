import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { AstronautService } from '../astronauts.service';
import { Subscription } from 'rxjs';
import { Astronauts } from '../../../common/models/astronauts/astronauts.model';
import { PaginationComponent } from '../../../common/components/pagination/pagination.component';

@Component({
  selector: 'app-astronauts-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FontAwesomeModule, RouterLink, PaginationComponent],
  templateUrl: './astronauts-list.component.html',
  styleUrl: './astronauts-list.component.css'
})
export class AstronautsListComponent implements OnInit, OnDestroy {

  faArrowRight = faArrowRight;
  astroSubscripstion$!: Subscription;
  astroList: Astronauts[] = [];
  page = 4;


  constructor(private astroService: AstronautService) {
  }

  ngOnInit(): void {
    this.astroSubscripstion$ =
      this.astroService.getAstronautsList(5,10).subscribe({
        next: (data) => this.astroList = data.results
      });
  }

  ngOnDestroy(): void {
    this.astroSubscripstion$?.unsubscribe();
  }

}
