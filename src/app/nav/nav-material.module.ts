import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule  } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
 imports: [
   MatToolbarModule,
   MatCardModule,
   MatIconModule,
   MatButtonModule,
   MatChipsModule
 ],
 exports: [
   MatToolbarModule,
   MatCardModule,
   MatIconModule,
   MatButtonModule,
   MatChipsModule
 ]
})

export class NavMaterialModule {

}
