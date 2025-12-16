import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CATEGORY_LABELS,
  CulturalEvent,
  STATUS_LABELS,
} from '../../models/event.model';

/**
 * Event Card Component
 * Displays a single event in a card format with actions.
 */

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article
      class="event-card"
      [class.event-card--cancelled]="event.status === 'cancelled'"
    >
      <div class="event-card__image">
        <img [src]="event.imageUrl" [alt]="event.title" loading="lazy" />
        <span class="event-card__category">{{
          getCategoryLabel(event.category)
        }}</span>
        <button
          class="event-card__favorite"
          [class.event-card__favorite--active]="isFavorite(event.id)"
          (click)="toggleFavorite($event, event.id)"
          [attr.aria-label]="
            isFavorite(event.id) ? 'Remove from favorites' : 'Add to favorites'
          "
        >
          {{ isFavorite(event.id) ? '★' : '☆' }}
        </button>
      </div>

      <div class="event-card__content">
        <div class="event-card__meta">
          <span class="event-card__status" [attr.data-status]="event.status">
            {{ getStatusLabel(event.status) }}
          </span>
          <span class="event-card__date">{{ formatDate(event.date) }}</span>
        </div>

        <h3 class="event-card__title">
          <a [routerLink]="['/events', event.id]">{{ event.title }}</a>
        </h3>

        <p class="event-card__venue">📍 {{ event.venue }}</p>

        <p class="event-card__description">{{ event.description }}</p>

        <div class="event-card__footer">
          <span class="event-card__price">€{{ event.ticketPrice }}</span>
          <span class="event-card__seats" *ngIf="event.availableSeats > 0">
            {{ event.availableSeats }} seats left
          </span>
          <span
            class="event-card__seats event-card__seats--sold-out"
            *ngIf="event.availableSeats === 0"
          >
            Sold out
          </span>
        </div>
      </div>

      <div class="event-card__actions">
        <button class="btn btn--secondary btn--sm" (click)="onEdit.emit(event)">
          Edit
        </button>
        <button
          class="btn btn--ghost btn--sm"
          (click)="onToggleStatus.emit(event)"
        >
          {{ event.status === 'published' ? 'Unpublish' : 'Publish' }}
        </button>
        <button class="btn btn--danger btn--sm" (click)="onDelete.emit(event)">
          Delete
        </button>
      </div>
    </article>
  `,
  styles: `
    .event-card {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--color-border);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }

      &--cancelled {
        opacity: 0.7;
      }
    }

    .event-card__image {
      position: relative;
      aspect-ratio: 4 / 3;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .event-card__category {
      position: absolute;
      top: var(--spacing-sm);
      left: var(--spacing-sm);
      background: var(--color-primary);
      color: white;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .event-card__favorite {
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      background: var(--color-surface);
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, background-color 0.2s;

      &:hover {
        transform: scale(1.1);
      }

      &--active {
        color: var(--color-warning);
        background: var(--color-warning-light);
      }
    }

    .event-card__content {
      padding: var(--spacing-md);
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .event-card__meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
    }

    .event-card__status {
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-weight: 500;
      font-size: 0.75rem;

      &[data-status='published'] {
        background: var(--color-success-light);
        color: var(--color-success);
      }

      &[data-status='draft'] {
        background: var(--color-warning-light);
        color: var(--color-warning);
      }

      &[data-status='cancelled'] {
        background: var(--color-danger-light);
        color: var(--color-danger);
      }
    }

    .event-card__date {
      color: var(--color-text-muted);
    }

    .event-card__title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: var(--spacing-xs) 0;

      a {
        color: var(--color-text);
        text-decoration: none;

        &:hover {
          color: var(--color-primary);
        }
      }
    }

    .event-card__venue {
      color: var(--color-text-muted);
      font-size: 0.875rem;
      margin: 0;
    }

    .event-card__description {
      color: var(--color-text-muted);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: var(--spacing-xs) 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex: 1;
    }

    .event-card__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--spacing-sm);
      padding-top: var(--spacing-sm);
      border-top: 1px solid var(--color-border);
    }

    .event-card__price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .event-card__seats {
      font-size: 0.875rem;
      color: var(--color-success);

      &--sold-out {
        color: var(--color-danger);
        font-weight: 600;
      }
    }

    .event-card__actions {
      display: flex;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--color-background);
      border-top: 1px solid var(--color-border);
    }
  `,
})
export class EventCardComponent {
  @Input({ required: true }) event!: CulturalEvent;
  @Output() onEdit = new EventEmitter<CulturalEvent>();
  @Output() onDelete = new EventEmitter<CulturalEvent>();
  @Output() onToggleStatus = new EventEmitter<CulturalEvent>();

  private favorites = new Set<string>();

  getCategoryLabel(category: CulturalEvent['category']): string {
    return CATEGORY_LABELS[category];
  }

  getStatusLabel(status: CulturalEvent['status']): string {
    return STATUS_LABELS[status];
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  }

  isFavorite(id: string): boolean {
    return this.favorites.has(id);
  }

  toggleFavorite(event: Event, id: string): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
  }
}
