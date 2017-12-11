"use strict";

class Cells {
    constructor(DOMCell, cells__total_cols = 4, cells__total_rows = 4) {
        this.cells=DOMCell;
        this.cells__total_cols = cells__total_cols; //количество столбцов
        this.cells__total_rows = cells__total_rows; //количество рядов
        this.cells__selected_col = -1; //выбранный столбец
        this.cells__selected_row = -1; //выбранный ряд

        this.CreateHTMLCells();

        this.cells__table = DOMCell.querySelector(".cells__table");
        this.cells__add_columm_button = DOMCell.querySelector(".cells__add_columm_button");
        this.cells__add_row_button = DOMCell.querySelector(".cells__add_row_button");
        this.cells__delete_column_button = DOMCell.querySelector(".cells__delete_column_button");
        this.cells__delete_row_button = DOMCell.querySelector(".cells__delete_row_button");

        this.AddListners();
    }

    CreateHTMLCells() {
        let i;

        let td = "<td class = \"cells__td\"></td>";
        let tr = "<tr>";

        for (i=0; i < this.cells__total_cols; i++) {
            tr += td;
        }

        tr += "</tr>";

        let table = '<table class = "cells__table">';

        for (i=0; i < this.cells__total_rows; i++) {
            table += tr;
        }

        this.cells.innerHTML = table +
            "</table>"+
				"<button class = \"cells__buttons cells__add_button cells__add_columm_button\"><i class=\"fa fa-plus\"></i></button>"+
				"<button class = \"cells__buttons cells__delete_button cells__delete_row_button\"><i class=\"fa fa-minus\"></i></button>"+
				"<button class = \"cells__buttons cells__delete_button cells__delete_column_button\"><i class=\"fa fa-minus\"></i></button>"+
				"<button class = \"cells__buttons cells__add_button cells__add_row_button\"><i class=\"fa fa-plus\"></i></button>";
    }

    AddListners() {
        //навешиваем обработчики клика и положения мышки

        this.cells__table.addEventListener("mouseover", this.MouseOverCells.bind(this));
        this.cells__table.addEventListener("mouseout", this.MouseOutCells.bind(this));

        this.cells__add_columm_button.addEventListener("click", this.AddCol.bind(this));
        this.cells__add_row_button.addEventListener("click", this.AddRow.bind(this));

        this.cells__delete_column_button.addEventListener("click", this.RemoveCol.bind(this));
        this.cells__delete_column_button.addEventListener("mouseover", this.SetEnabledColDeleteButton.bind(this));
        this.cells__delete_column_button.addEventListener("mouseout", this.SetDisabledColDeleteButton.bind(this));

        this.cells__delete_row_button.addEventListener("click", this.RemoveRow.bind(this));
        this.cells__delete_row_button.addEventListener("mouseover", this.SetEnabledRowDeleteButton.bind(this));
        this.cells__delete_row_button.addEventListener("mouseout", this.SetDisabledRowDeleteButton.bind(this));
    }

    MouseOutCells() {
        //Мышь вне таблицы
        this.SetDisabledRowDeleteButton();
        this.SetDisabledColDeleteButton();
    }

    MouseOverCells(event) {
        //мышь на таблице
        if (event.target.classList.contains("cells__td")) {
            this.cells__selected_row=event.target.parentElement.rowIndex;
            this.cells__selected_col=event.target.cellIndex;

            this.SetEnabledRowDeleteButton();
            this.SetEnabledColDeleteButton();

            this.MoveDeleteRowButton(event.layerY-event.offsetY);
            this.MoveDeleteColButton(event.layerX-event.offsetX);
        }
    }

    SetEnabledRowDeleteButton() {
        if (this.cells__total_rows > 1)
            this.cells__delete_row_button.classList.add("cells__button-enabled");
    }

    SetEnabledColDeleteButton() {
        if (this.cells__total_cols > 1)
            this.cells__delete_column_button.classList.add("cells__button-enabled");
    }

    SetDisabledColDeleteButton() {
        this.cells__delete_column_button.classList.remove("cells__button-enabled");
    }

    SetDisabledRowDeleteButton() {
        this.cells__delete_row_button.classList.remove("cells__button-enabled");
    }

    MoveDeleteRowButton(offsetTop) {
        this.cells__delete_row_button.style.top = offsetTop + "px";
    }

    MoveDeleteColButton(offsetLeft) {
        this.cells__delete_column_button.style.left = offsetLeft + "px";
    }

    RemoveCol() {
        if (this.cells__total_cols > 1) {
            for (let r = 0; r < this.cells__total_rows; r++) {
                this.cells__table.rows[r].deleteCell(this.cells__selected_col);
            }
            this.cells__total_cols -= 1;

            this.SetDisabledColDeleteButton();
        }
     }

    RemoveRow() {
        if (this.cells__total_rows > 1) {
            this.cells__table.deleteRow(this.cells__selected_row);

            this.cells__total_rows -= 1;
            this.SetDisabledRowDeleteButton();
        }
    }

    AddCol() {
        for (let r = 0; r < this.cells__total_rows; r++) {
            this.cells__table.rows[r].insertCell(this.cells__total_cols);
            this.cells__table.rows[r].cells[this.cells__total_cols].classList.add("cells__td");
        }
        this.cells__total_cols += 1;
    }

    AddRow() {
        let newrow = this.cells__table.insertRow(this.cells__total_rows);

        for (let c = 0; c < this.cells__total_cols; c++) {
            newrow.insertCell(-1);
            newrow.cells[c].classList.add("cells__td");
        }
        this.cells__total_rows += 1;
    }
}


window.onload = function() {

    let DOMCells = document.querySelectorAll(".cells");

    for (let i = 0; i < DOMCells.length; i++) new Cells(DOMCells[i]);

} ;
