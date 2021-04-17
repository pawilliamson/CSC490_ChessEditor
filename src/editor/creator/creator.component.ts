import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
	DragDropModule,moveItemInArray, transferArrayItem, copyArrayItem, CdkDragStart,CdkDragDrop, CdkDrag, CdkDropList, CdkDragExit,CdkDragMove
	} from '@angular/cdk/drag-drop';

import {BoardComponent} from '../../chess/board/board.component';
@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements AfterViewInit {
@ViewChild("board")board:any;

CdkDragExit(){
console.log("test");
}

CdkDragStart(event:CdkDrag<string[]>){
console.log("test");
}
  pieceCollection:Array<string> = ["P", "N", "B", "R", "Q", "K", "p", "n", "b", "r", "q", "k"];
	primaryColor : string = "bg-primary";
	secondaryColor: string = "bg-secondary";
	pieceToAdd: string | unknown;
	colorToAdd: string | unknown;
	
	
	
    pieces = [
        {piece: "P", limit: 8},
        {piece: "N", limit: 2},
        {piece: "B", limit: 2},
        {piece: "R", limit: 2},
        {piece: "Q", limit: 1},
        {piece: "K", limit: 1},
        {piece: "p", limit: 8},
        {piece: "n", limit: 2},
        {piece: "b", limit: 2},
        {piece: "r", limit: 2},
        {piece: "q", limit: 1},
        {piece: "k", limit: 1}];
	
	getLimit(piece:string){
		for ( let p = 0; p < this.pieces.length; p++){
		if(this.pieces[p].piece == piece){
		return this.pieces[p].limit;
		}
		}
		return -1;
	}
	
    dragStarted (event : CdkDragStart) {
        console.log(event);
    }
    start(piece: string){
		for ( let p = 0; p < this.pieces.length; p++){
		if(this.pieces[p].piece == piece){
		this.pieces[p].limit--;
		
		
		if(this.pieces[p].limit > 0){
		 this.pieceCollection.push(piece);
		}
		break;
		}
		
		}
		
    }
     end(piece: string){
		for ( let p = 0; p < this.pieces.length; p++){
			
		if(this.pieces[p].piece == piece){
		this.pieces[p].limit = this.pieces[p].limit++;
		if(this.pieces[p].limit == 0){
		 this.pieceCollection.push(piece);
		}
		break;
		}
		
		}
		
    }
	
	drop(event: CdkDragDrop<string[]>) {
	
            if (event.previousContainer === event.container) {
                moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            } else {
                transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            }
             let p = 0;
           for (; p < this.pieceCollection.length; p++){
           while(this.pieceCollection.filter((x)=> x== this.pieceCollection[p]).length > 1){ 
			  let z = 0;
			   for( ;z < this.pieces.length; z++){
			     if (this.pieces[z].piece == this.pieceCollection[p]){
			        this.pieces[z].limit = this.pieces[z].limit + 1;
			     }
			   }
			   this.pieceCollection.splice(p, 1);
			  }
		}
		
		
		
	}
  constructor() { }

  ngAfterViewInit(): void {
  }
	startEditor(){
	        let editor = <HTMLInputElement>document.getElementById("editorTools");
		editor.style.display = "block";
	}

	addPiece(color: string){
		
	}

	saveBoard(){
        let editor = <HTMLInputElement>document.getElementById("editorTools");
		editor.style.display = "none";
		console.log(this.board.toFENString());
	}

	setNewPiece(pieceType: string){
		this.pieceToAdd = pieceType;
	}

	setNewColor(color: string){
		this.colorToAdd = color;
	}

}
