import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CATEGORY_LABELS,
  EventCategory,
  EventFilters,
  EventStatus,
  STATUS_LABELS,
} from '../../models/event.model';

/**
 * Event Filter Component
 * Provides filtering controls for the event list.
 */

interface FilterOption<T> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-event-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters">
      <div class="filters__search">
        <input
          type="text"
          class="filters__input"
          placeholder="Search events..."
          [ngModel]="filters.searchTerm"
          (ngModelChange)="onSearchChange($event)"
        />
        <span class="filters__search-icon">🔍</span>
      </div>

      <div class="filters__dropdowns">
        <div class="filters__group">
          <label class="filters__label">Status</label>
          <select
            class="filters__select"
            [ngModel]="filters.status"
            (ngModelChange)="onStatusChange($event)"
          >
            <option value="all">All Statuses</option>
            <ng-container *ngFor="let option of statusOptions">
              <option [value]="option.value">{{ option.label }}</option>
            </ng-container>
          </select>
        </div>

        <div class="filters__group">
          <label class="filters__label">Category</label>
          <select
            class="filters__select"
            [ngModel]="filters.category"
            (ngModelChange)="onCategoryChange($event)"
          >
            <option value="all">All Categories</option>
            <ng-container *ngFor="let option of categoryOptions">
              <option [value]="option.value">{{ option.label }}</option>
            </ng-container>
          </select>
        </div>

        <button
          class="btn btn--ghost"
          (click)="onReset.emit()"
          *ngIf="hasActiveFilters"
        >
          Clear Filters
        </button>
      </div>

      <div class="filters__summary" *ngIf="hasActiveFilters">
        <span>Active filters:</span>
        <span class="filters__tag" *ngIf="filters.status !== 'all'">
          Status: {{ getStatusLabel(filters.status) }}
          <button (click)="clearStatus()">×</button>
        </span>
        <span class="filters__tag" *ngIf="filters.category !== 'all'">
          Category: {{ getCategoryLabel(filters.category) }}
          <button (click)="clearCategory()">×</button>
        </span>
        <span class="filters__tag" *ngIf="filters.searchTerm">
          Search: "{{ filters.searchTerm }}"
          <button (click)="clearSearch()">×</button>
        </span>
      </div>
    </div>
  `,
  styles: `
    .filters {
      background: var(--color-surface);
      padding: var(--spacing-md);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .filters__search {
      position: relative;
    }

    .filters__input {
      width: 100%;
      padding: var(--spacing-sm) var(--spacing-md);
      padding-left: 2.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 1rem;
      background: var(--color-background);
      color: var(--color-text);

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-light);
      }

      &::placeholder {
        color: var(--color-text-muted);
      }
    }

    .filters__search-icon {
      position: absolute;
      left: var(--spacing-sm);
      top: 50%;
      transform: translateY(-50%);
      font-size: 1rem;
    }

    .filters__dropdowns {
      display: flex;
      gap: var(--spacing-md);
      flex-wrap: wrap;
      align-items: flex-end;
    }

    .filters__group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      min-width: 150px;
    }

    .filters__label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-muted);
    }

    .filters__select {
      padding: var(--spacing-xs) var(--spacing-sm);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-background);
      color: var(--color-text);
      font-size: 0.875rem;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    }

    .filters__summary {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .filters__tag {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      background: var(--color-primary-light);
      color: var(--color-primary);
      padding: 2px var(--spacing-sm);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;

      button {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
        line-height: 1;

        &:hover {
          color: var(--color-danger);
        }
      }
    }
  `,
})
export class EventFilterComponent {
  @Input({ required: true }) filters!: EventFilters;
  @Output() filtersChange = new EventEmitter<Partial<EventFilters>>();
  @Output() onReset = new EventEmitter<void>();

  statusOptions: FilterOption<EventStatus>[] = [
    { value: 'draft', label: STATUS_LABELS['draft'] },
    { value: 'published', label: STATUS_LABELS['published'] },
    { value: 'cancelled', label: STATUS_LABELS['cancelled'] },
  ];

  categoryOptions: FilterOption<EventCategory>[] = [
    { value: 'concert', label: CATEGORY_LABELS['concert'] },
    { value: 'opera', label: CATEGORY_LABELS['opera'] },
    { value: 'theater', label: CATEGORY_LABELS['theater'] },
    { value: 'exhibition', label: CATEGORY_LABELS['exhibition'] },
  ];

  get hasActiveFilters(): boolean {
    return (
      this.filters.status !== 'all' ||
      this.filters.category !== 'all' ||
      this.filters.searchTerm !== ''
    );
  }

  getStatusLabel(status: EventStatus): string {
    return STATUS_LABELS[status];
  }

  getCategoryLabel(category: EventCategory): string {
    return CATEGORY_LABELS[category];
  }

  onSearchChange(term: string): void {
    this.filtersChange.emit({ searchTerm: term });
  }

  onStatusChange(status: EventStatus | 'all'): void {
    this.filtersChange.emit({ status });
  }

  onCategoryChange(category: EventCategory | 'all'): void {
    this.filtersChange.emit({ category });
  }

  clearStatus(): void {
    this.filtersChange.emit({ status: 'all' });
  }

  clearCategory(): void {
    this.filtersChange.emit({ category: 'all' });
  }

  clearSearch(): void {
    this.filtersChange.emit({ searchTerm: '' });
  }
}
