<script setup>
import { ref, onBeforeMount } from "vue";
import {
  cv_data_spanish,
  skills_spanish,
  intro_spanish,
  cv_data_english,
  skills_english,
  intro_english,
} from "./../lib/cv";
import InfoEntry from "@/components/InfoEntry.vue";

const cv = ref([]);
const skills = ref([]);
const intro = ref([{ title: "", paragraph: "", email: "", phone: "" }]);
const loading = ref(true);
const isEnglish = ref(true);

const loadCV = () => {
  loading.value = true;
  const selectedData = isEnglish.value
    ? [cv_data_english, skills_english, intro_english]
    : [cv_data_spanish, skills_spanish, intro_spanish];

  Promise.all(selectedData)
    .then(([cds, ss, is]) => {
      loading.value = false;
      cv.value = cds;
      skills.value = ss;
      intro.value = is;
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      loading.value = false;
    });
};

const toggleLanguage = () => {
  isEnglish.value = !isEnglish.value;
  loadCV();
};

onBeforeMount(() => {
  loadCV();
});
</script>

<template>
  <button @click="toggleLanguage" class="language-toggle">
    {{ isEnglish ? "EN" : "ES" }}
  </button>

  <div class="spinner" :class="`${loading ? 'show' : 'hide'}`">
    <div id="nucleus"></div>
    <div id="orbit"></div>
    <div id="electron"></div>
  </div>
  <div class="wrapper" :class="`${loading ? 'hide' : 'show'}`">
    <header>
      <h1>Maria Paula Dangond Arteta</h1>
      <p class="title">{{ intro[0].title }}</p>
      <p class="paragraph">
        {{ intro[0].paragraph }}
      </p>
      <p class="email">{{ intro[0].email }}</p>
      <ul class="onlyScreen">
        <li>
          <a href="javascript:if(window.print)window.print()"
            >{{ isEnglish ? "print" : "imprimir" }} <strong>PDF</strong></a
          >
        </li>
        <li>
          <a :href="`https://wa.me/${intro[0].phone}`" target="_blank"
            >{{ isEnglish ? "chat" : "chat" }} <strong>WA</strong></a
          >
        </li>
        <li>
          <a :href="`mailto:${intro[0].email}`" target="_blank"
            >{{ isEnglish ? "contact" : "contactar" }}<strong>Email</strong></a
          >
        </li>
      </ul>
    </header>
    <section>
      <h3 class="banner">
        {{ isEnglish ? "Work Experience" : "Experiencia Laboral" }}
      </h3>
      <InfoEntry
        v-for="(e, i) in cv.filter((e) => e.category == 'Exp')"
        :entry="e"
        :key="i"
      />
      <h3 class="banner">{{ isEnglish ? "Education" : "Educación" }}</h3>
      <InfoEntry
        v-for="(e, i) in cv.filter((e) => e.category == 'Edu')"
        :entry="e"
        :key="i"
      />
      <h3 class="banner">
        {{ isEnglish ? "Entrepreneurship" : "Emprendimiento" }}
      </h3>
      <InfoEntry
        v-for="(e, i) in cv.filter((e) => e.category == 'Emp')"
        :entry="e"
        :key="i"
      />
      <h3 class="banner">
        {{
          isEnglish ? "Skills and Competences" : "Habilidades y Competencias"
        }}
      </h3>

      <table>
        <tbody>
          <tr>
            <th>{{ isEnglish ? "Language" : "Idioma" }}</th>
            <th>{{ isEnglish ? "Level" : "Nivel" }}</th>
          </tr>
          <tr>
            <td>{{ isEnglish ? "Spanish" : "Español" }}</td>
            <td>C2 ({{ isEnglish ? "native" : "nativo" }})</td>
          </tr>
          <tr>
            <td>{{ isEnglish ? "English" : "Inglés" }}</td>
            <td>C2</td>
          </tr>
          <tr>
            <td>{{ isEnglish ? "Italian" : "Italiano" }}</td>
            <td>B1</td>
          </tr>
        </tbody>
      </table>

      <dl>
        <div v-for="skill in skills" :key="skill.skill">
          <dt>{{ skill.skill }}</dt>
          <dd>
            {{ skill.description }}
          </dd>
        </div>
      </dl>
    </section>
    <footer></footer>
  </div>
</template>

<style lang="scss" scoped>
.language-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  color: var(--color-text-dark);

  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  z-index: 1000;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

.wrapper {
  opacity: 0;
  transition: all 0.5s;
}

$spinner-width: 60px;
$nucleus-width: $spinner-width * 0.4;
$orbit-width: $spinner-width * 0.8;
$electron-width: $spinner-width * 0.15;

.spinner {
  width: $spinner-width;
  height: $spinner-width;
  position: absolute;
  opacity: 0.8;
  left: 50%;
  top: 50%;
  animation: spin 5s linear infinite;
  transition: all 0.5s;
}
.spinner > div {
  border-radius: 100px;
  position: absolute;
}

#nucleus {
  background-color: var(--color-text-dark);
  width: $nucleus-width;
  height: $nucleus-width;
  left: calc(($spinner-width - $nucleus-width) / 2);
  top: calc(($spinner-width - $nucleus-width) / 2);
}

#orbit {
  border: 2px solid var(--color-text-dark);
  width: $orbit-width;
  height: $orbit-width;
  left: calc((($spinner-width - $orbit-width) / 2) - 1px);
  top: calc((($spinner-width - $orbit-width) / 2) - 1px);
}

#electron {
  background-color: var(--color-text-dark);
  width: $electron-width;
  height: $electron-width;
  left: calc(
    (($spinner-width - $orbit-width) / 2) - (($electron-width - 2px) / 2)
  );
  top: calc(($spinner-width - $electron-width) / 2);
}

.title {
  font-weight: bold;
  font-style: italic;
  font-size: 0.8rem;
}

.paragraph {
  text-align: justify;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.show {
  opacity: 1;
}

.hide {
  opacity: 0;
}

@media print {
  .language-toggle {
    display: none;
  }
}
</style>
