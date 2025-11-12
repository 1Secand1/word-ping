<template>
  <div class="about-container">
    <SectionHeader
      subtitle="О проекте"
      title="Word Ping"
    />

    <div class="about-content">
      <div class="description-section">
        <h3>Описание проекта</h3>
        <p>
          <strong>Word Ping</strong> — это приложение для изучения английских слов,
          которое помогает запоминать новую лексику через фоновое воспроизведение.
        </p>
        <p>
          Основная идея проекта заключается в том, чтобы воспроизводить слова
          в фоновом режиме, позволяя вам изучать английский язык пассивно,
          даже когда вы заняты другими делами.
        </p>
      </div>

      <div class="how-it-works-section">
        <h3>Как это работает</h3>
        <ol class="steps-list">
          <li>
            Создайте свой словарь, добавив английские слова с переводами и примерами
          </li>
          <li>
            Перейдите на страницу воспроизведения и запустите автоматическое озвучивание
          </li>
          <li>
            Приложение будет циклически воспроизводить слова из вашего словаря,
            произнося сначала английское слово, затем перевод и пример предложения
          </li>
          <li>
            Вы можете остановить воспроизведение в любой момент и продолжить позже
          </li>
        </ol>
      </div>

      <div class="features-section">
        <h3>Возможности</h3>
        <ul class="features-list">
          <li>
            <strong>Управление словарём</strong> — создавайте и редактируйте свой
            персональный словарь с английскими словами, переводами и примерами использования
          </li>
          <li>
            <strong>Фоновое воспроизведение</strong> — автоматическое озвучивание слов
            с интервалами, позволяющее изучать язык без отрыва от текущих дел
          </li>
          <li>
            <strong>Многоязычная поддержка</strong> — воспроизведение слов на английском
            и русском языках для лучшего понимания
          </li>
          <li>
            <strong>Примеры использования</strong> — каждое слово сопровождается примером
            предложения для лучшего запоминания контекста
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from "@/components/SectionHeader.vue";
</script>

<style scoped>
.about-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.about-content {
  margin-top: 3rem;
}

.description-section,
.features-section,
.how-it-works-section {
  margin-bottom: 3rem;
}

.description-section h3,
.features-section h3,
.how-it-works-section h3 {
  font-size: 24px;
  color: #2a2a2a;
  margin-bottom: 1rem;
  font-weight: 500;
}

.description-section p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--vwa-c-text-1);
  margin-bottom: 1rem;
}

.description-section p:last-child {
  margin-bottom: 0;
}

.features-list,
.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li,
.steps-list li {
  font-size: 16px;
  line-height: 1.5;
  color: var(--vwa-c-text-1);
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;
}

.features-list li:last-child,
.steps-list li:last-child {
  margin-bottom: 0;
}

.features-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #626aef;
  font-weight: bold;
  font-size: 18px;
}

.steps-list li::before {
  content: counter(step-counter);
  counter-increment: step-counter;
  position: absolute;
  left: 0;
  color: #626aef;
  font-weight: bold;
  background-color: #f0f0f0;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.steps-list {
  counter-reset: step-counter;
}

.features-list li strong,
.steps-list li strong {
  color: #2a2a2a;
  font-weight: 600;
}

@media (max-width: 767px) {
  .about-container {
    padding: 1rem;
  }

  .description-section h3,
  .features-section h3,
  .how-it-works-section h3 {
    font-size: 20px;
  }

  .description-section p,
  .features-list li,
  .steps-list li {
    font-size: 14px;
  }
}
</style>
