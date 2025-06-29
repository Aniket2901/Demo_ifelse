import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'team-table',
  standalone: true,
  templateUrl: './team-table.html',
  styleUrl: './team-table.css',
  imports: [CommonModule, FormsModule],
})
export class TeamTableComponent implements OnInit {
  members: any[] = [];
  paginatedMembers: any[] = [];
  gridColumns: any[] = [];
  currentPage = 1;
  pageSize = 10;
  editingMember: any = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.http.get<any>('https://01.fy25ey01.64mb.io/').subscribe(response => {
      this.gridColumns = response.grid_columns;

      this.members = response.grid_data.map((m: any) => ({
        ...m,
        selected: false
      }));
      this.updatePagination();
      this.cdr.detectChanges();
    });
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMembers = this.members.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.members.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  toggleAll(event: any): void {
    const checked = event.target.checked;
    this.paginatedMembers.forEach(member => member.selected = checked);
  }

  editMember(member: any): void {
    this.editingMember = member;
    // alert(`Edit: ${member.name}`);
  }

  deleteMember(member: any): void {
    if (confirm(`Delete ${member.name}?`)) {
      this.members = this.members.filter(m => m.id !== member.id);
      this.updatePagination();
    }
  }

  deleteSelected(): void {
    this.members = this.members.filter(m => !m.selected);
    this.updatePagination();
  }
  setPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }
closeEdit(): void {
  this.editingMember = null;
}

isAllSelected(): boolean {
  return this.paginatedMembers.length > 0 &&
         this.paginatedMembers.every(m => m.selected);
}

isIndeterminate(): boolean {
  const selectedCount = this.paginatedMembers.filter(m => m.selected).length;
  return selectedCount > 0 && selectedCount < this.paginatedMembers.length;
}


}
