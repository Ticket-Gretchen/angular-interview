import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CATEGORY_LABELS, CulturalEvent } from '../../models/event.model';
import { EventStore } from '../../store/event.store';

/**
 * Event Detail Page
 * Shows full details for a single event including a countdown timer.
 */

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="event-detail" *ngIf="event">
      <div class="event-detail__header">
        <a routerLink="/" class="event-detail__back">← Back to Events</a>

        <div class="event-detail__actions">
          <button
            class="btn btn--secondary"
            [routerLink]="['/events', event.id, 'edit']"
          >
            Edit Event
          </button>
          <button class="btn btn--danger" (click)="deleteEvent()">
            Delete
          </button>
        </div>
      </div>

      <div class="event-detail__hero">
        <img
          [src]="event.imageUrl"
          [alt]="event.title"
          class="event-detail__image"
        />
        <div class="event-detail__overlay">
          <span class="event-detail__category">{{
            getCategoryLabel(event.category)
          }}</span>
          <h1 class="event-detail__title">{{ event.title }}</h1>
          <p class="event-detail__venue">📍 {{ event.venue }}</p>
        </div>
      </div>

      <div class="event-detail__content">
        <div class="event-detail__main">
          <section class="event-detail__section">
            <h2>About this Event</h2>
            <p>{{ event.description }}</p>
          </section>

          <section class="event-detail__section">
            <h2>Event Details</h2>
            <dl class="event-detail__info">
              <div class="event-detail__info-item">
                <dt>Date & Time</dt>
                <dd>{{ formatDate(event.date) }}</dd>
              </div>
              <div class="event-detail__info-item">
                <dt>Venue</dt>
                <dd>{{ event.venue }}</dd>
              </div>
              <div class="event-detail__info-item">
                <dt>Category</dt>
                <dd>{{ getCategoryLabel(event.category) }}</dd>
              </div>
              <div class="event-detail__info-item">
                <dt>Status</dt>
                <dd>
                  <span
                    class="event-detail__status"
                    [attr.data-status]="event.status"
                  >
                    {{ event.status }}
                  </span>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <aside class="event-detail__sidebar">
          <div class="event-detail__card">
            <div class="event-detail__price">€{{ event.ticketPrice }}</div>
            <div class="event-detail__seats">
              <span *ngIf="event.availableSeats > 0">
                {{ event.availableSeats }} seats available
              </span>
              <span *ngIf="event.availableSeats === 0" class="sold-out">
                Sold Out
              </span>
            </div>

            <div class="event-detail__countdown" *ngIf="countdown">
              <h3>Event starts in:</h3>
              <div class="countdown">
                <div class="countdown__item">
                  <span class="countdown__value">{{ countdown.days }}</span>
                  <span class="countdown__label">Days</span>
                </div>
                <div class="countdown__item">
                  <span class="countdown__value">{{ countdown.hours }}</span>
                  <span class="countdown__label">Hours</span>
                </div>
                <div class="countdown__item">
                  <span class="countdown__value">{{ countdown.minutes }}</span>
                  <span class="countdown__label">Min</span>
                </div>
                <div class="countdown__item">
                  <span class="countdown__value">{{ countdown.seconds }}</span>
                  <span class="countdown__label">Sec</span>
                </div>
              </div>
            </div>

            <button
              class="btn btn--primary btn--lg btn--full"
              [disabled]="event.availableSeats === 0"
            >
              {{ event.availableSeats > 0 ? 'Book Tickets' : 'Sold Out' }}
            </button>
          </div>
        </aside>
      </div>
    </div>

    <div class="loading" *ngIf="!event && !error">
      <div class="loading__spinner"></div>
      <p>Loading event...</p>
    </div>

    <div class="error" *ngIf="error">
      <h2>Event not found</h2>
      <p>{{ error }}</p>
      <a routerLink="/" class="btn btn--primary">Back to Events</a>
    </div>
  `,
  styles: `
    .event-detail {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-lg);
    }

    .event-detail__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .event-detail__back {
      color: var(--color-text-muted);
      text-decoration: none;

      &:hover {
        color: var(--color-primary);
      }
    }

    .event-detail__actions {
      display: flex;
      gap: var(--spacing-sm);
    }

    .event-detail__hero {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      margin-bottom: var(--spacing-xl);
    }

    .event-detail__image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    .event-detail__overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--spacing-xl);
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      color: white;
    }

    .event-detail__category {
      display: inline-block;
      background: var(--color-primary);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--radius-sm);
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: var(--spacing-sm);
    }

    .event-detail__title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 var(--spacing-xs);
    }

    .event-detail__venue {
      font-size: 1.25rem;
      margin: 0;
      opacity: 0.9;
    }

    .event-detail__content {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: var(--spacing-xl);

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .event-detail__section {
      margin-bottom: var(--spacing-xl);

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 var(--spacing-md);
        padding-bottom: var(--spacing-sm);
        border-bottom: 1px solid var(--color-border);
      }

      p {
        color: var(--color-text-muted);
        line-height: 1.7;
      }
    }

    .event-detail__info {
      display: grid;
      gap: var(--spacing-md);
      margin: 0;
    }

    .event-detail__info-item {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--color-border);

      dt {
        color: var(--color-text-muted);
      }

      dd {
        font-weight: 500;
        margin: 0;
      }
    }

    .event-detail__status {
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-size: 0.875rem;
      text-transform: capitalize;

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

    .event-detail__sidebar {
      @media (max-width: 900px) {
        order: -1;
      }
    }

    .event-detail__card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      position: sticky;
      top: calc(var(--header-height, 60px) + var(--spacing-lg));
    }

    .event-detail__price {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: var(--spacing-xs);
    }

    .event-detail__seats {
      color: var(--color-text-muted);
      margin-bottom: var(--spacing-lg);

      .sold-out {
        color: var(--color-danger);
        font-weight: 600;
      }
    }

    .event-detail__countdown {
      margin-bottom: var(--spacing-lg);

      h3 {
        font-size: 0.875rem;
        color: var(--color-text-muted);
        margin: 0 0 var(--spacing-sm);
      }
    }

    .countdown {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-xs);
    }

    .countdown__item {
      text-align: center;
      padding: var(--spacing-sm);
      background: var(--color-background);
      border-radius: var(--radius-sm);
    }

    .countdown__value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .countdown__label {
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .loading,
    .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl);
      text-align: center;
      min-height: 400px;
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
  `,
})
export class EventDetailComponent implements OnInit {
  event: CulturalEvent | null = null;
  error: string | null = null;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null = null;

  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: EventStore,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.selectEvent(id);
      this.store.selectedEvent$.subscribe({
        next: (event) => {
          if (event) {
            this.event = event;
            this.startCountdown();
          }
        },
        error: (err) => {
          this.error = err.message;
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.store.selectEvent(null);
  }

  getCategoryLabel(category: CulturalEvent['category']): string {
    return CATEGORY_LABELS[category];
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  }

  deleteEvent(): void {
    if (
      this.event &&
      confirm(`Are you sure you want to delete "${this.event.title}"?`)
    ) {
      this.store.deleteEvent(this.event.id).subscribe({
        next: () => this.router.navigate(['/']),
      });
    }
  }

  private startCountdown(): void {
    if (!this.event) return;

    this.ngZone.runOutsideAngular(() => {
      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
        console.log('Countdown:', this.countdown);
      }, 1000);
    });

    // Initial update
    this.updateCountdown();
  }

  private updateCountdown(): void {
    if (!this.event) return;

    const eventDate = new Date(this.event.date).getTime();
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff <= 0) {
      this.countdown = null;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.countdown = { days, hours, minutes, seconds };
  }
}
