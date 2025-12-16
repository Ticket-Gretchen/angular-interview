import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventFilterComponent } from '../../components/event-filter/event-filter.component';
import { CulturalEvent, EventFilters } from '../../models/event.model';
import { EventStore } from '../../store/event.store';

/**
 * Event List Page
 * Displays all cultural events with filtering capabilities.
 */

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent, EventFilterComponent],
  template: `
    <div class="event-list-page">
      <div class="event-list-page__header">
        <h1>Cultural Events</h1>
        <p class="event-list-page__subtitle">
          Discover concerts, opera, theater, and exhibitions
        </p>
      </div>

      <app-event-filter
        [filters]="filters"
        (filtersChange)="onFiltersChange($event)"
        (onReset)="onResetFilters()"
      ></app-event-filter>

      <div class="event-list-page__stats" *ngIf="eventCounts">
        <div class="stat">
          <span class="stat__value">{{ eventCounts.total }}</span>
          <span class="stat__label">Total</span>
        </div>
        <div class="stat">
          <span class="stat__value">{{ eventCounts.published }}</span>
          <span class="stat__label">Published</span>
        </div>
        <div class="stat">
          <span class="stat__value">{{ eventCounts.draft }}</span>
          <span class="stat__label">Draft</span>
        </div>
      </div>

      <div class="event-list-page__content">
        <div class="loading" *ngIf="loading">
          <div class="loading__spinner"></div>
          <p>Loading events...</p>
        </div>

        <div class="error" *ngIf="error">
          <p>{{ error }}</p>
          <button class="btn btn--primary" (click)="loadEvents()">
            Try Again
          </button>
        </div>

        <div
          class="event-grid"
          *ngIf="!loading && !error && filteredEvents.length > 0"
        >
          <app-event-card
            *ngFor="let event of filteredEvents; trackBy: trackByEventId"
            [event]="event"
            (onEdit)="editEvent($event)"
            (onDelete)="deleteEvent($event)"
            (onToggleStatus)="toggleStatus($event)"
          ></app-event-card>
        </div>

        <div
          class="empty-state"
          *ngIf="!loading && !error && filteredEvents.length === 0"
        >
          <div class="empty-state__icon">🎭</div>
          <h2>No events found</h2>
          <p>Try adjusting your filters or create a new event.</p>
          <button class="btn btn--primary" (click)="createEvent()">
            Create Event
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .event-list-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-lg);
    }

    .event-list-page__header {
      margin-bottom: var(--spacing-lg);

      h1 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 var(--spacing-xs);
      }
    }

    .event-list-page__subtitle {
      color: var(--color-text-muted);
      margin: 0;
    }

    .event-list-page__stats {
      display: flex;
      gap: var(--spacing-lg);
      margin: var(--spacing-lg) 0;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-md);
      background: var(--color-surface);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      min-width: 100px;
    }

    .stat__value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .stat__label {
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .event-list-page__content {
      margin-top: var(--spacing-lg);
    }

    .event-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--spacing-lg);
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl);
      color: var(--color-text-muted);
    }

    .loading__spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .error {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--color-danger);
    }

    .empty-state {
      text-align: center;
      padding: var(--spacing-xl);

      h2 {
        margin: var(--spacing-md) 0 var(--spacing-xs);
      }

      p {
        color: var(--color-text-muted);
        margin-bottom: var(--spacing-md);
      }
    }

    .empty-state__icon {
      font-size: 4rem;
    }
  `,
})
export class EventListComponent implements OnInit {
  filteredEvents: CulturalEvent[] = [];
  filters: EventFilters = { status: 'all', category: 'all', searchTerm: '' };
  eventCounts: { total: number; published: number; draft: number } | null =
    null;
  loading = false;
  error: string | null = null;

  constructor(private store: EventStore, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();

    this.store.filteredEvents$.subscribe((events) => {
      console.log('Filtered events updated:', events.length);
      this.filteredEvents = events;
    });

    this.store.filters$.subscribe((filters) => {
      this.filters = filters;
    });

    this.store.eventCounts$.subscribe((counts) => {
      this.eventCounts = counts;
    });

    this.store.loading$.subscribe((loading) => {
      this.loading = loading;
    });

    this.store.error$.subscribe((error) => {
      this.error = error;
    });
  }

  loadEvents(): void {
    this.store.loadEvents();
  }

  onFiltersChange(filters: Partial<EventFilters>): void {
    this.store.updateFilters(filters);
  }

  onResetFilters(): void {
    this.store.resetFilters();
  }

  editEvent(event: CulturalEvent): void {
    this.router.navigate(['/events', event.id, 'edit']);
  }

  deleteEvent(event: CulturalEvent): void {
    if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
      this.store.deleteEvent(event.id).subscribe();
    }
  }

  toggleStatus(event: CulturalEvent): void {
    this.store.toggleEventStatus(event.id);
  }

  createEvent(): void {
    this.router.navigate(['/events/new']);
  }

  trackByEventId(_index: number, event: CulturalEvent): string {
    return event.id;
  }
}
