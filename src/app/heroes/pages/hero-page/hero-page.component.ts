import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``,
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(2000),
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe(
        // (id) => console.log(id)
        (hero) => {
          if (!hero) return this.router.navigate(['/heroes/list']); //PORQUE PUEDE SER UNDEFINED
          this.hero = hero;
          console.log(hero);
          return;
        }
      );
  }

  goBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }
}
