import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import CollegeDetail from '../pages/_slug/index.vue'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('College Detail', () => {

  let store;

  const data = {
    "name": "Khwopa College",
    "slug": "khwopa-college",
    "cover_image": "http://via.placeholder.com/1500x150",
    "logo": "http://via.placeholder.com/150x150",
    "boards": [
      {
        "slug": "tribhuwan-university",
        "name": "Tribhuwan University"
      },
      {
        "slug": "khwopa",
        "name": "Khwopa University"
      }
    ],
    "description": "asas",
    "recent_awards": [
      {
        "slug": "a4",
        "name": "A4"
      },
      {
        "slug": "a3",
        "name": "A3"
      },
      {
        "slug": "a2",
        "name": "A2"
      }
    ],
    "awards_count": 4,
    "documents": [
      {
        "name": "asdasd",
        "file": "http://via.placeholder.com/150x150"
      },
      {
        "name": "Brochure",
        "file": "http://via.placeholder.com/150x150"
      }
    ],
    "established": 1982,
    "address": "Bhaktapur",
    "district": "Bhaktapur",
    "type": "Private",
    "phone": [
      "01-6611932",
      "01-5612031"
    ],
    "email": [
      "info@khcollege.example"
    ],
    "website": "http://khwopacollege.edu.np",
    "images": [
      {
        "name": "ccc",
        "file": "http://via.placeholder.com/150x150"
      },
      {
        "name": "bbb",
        "file": "http://via.placeholder.com/150x150"
      },
      {
        "name": "aaa",
        "file": "http://via.placeholder.com/150x150"
      }
    ],
    "salient_features": "",
    "admission_guidelines": "",
    "scholarship_information": "",
    "network_institutes": [
      {
        "name": "Khwopa PG",
        "logo": null,
        "slug": "khwopa-pg",
        "levels": [
          "Pre-school"
        ]
      },
      {
        "name": "Khwopa School",
        "logo": null,
        "slug": "khwopa-school",
        "levels": [
          "Secondary School",
          "Primary School"
        ]
      }
    ],
    "levels": [
      "Masters",
      "Bachelors"
    ],
    "programs": [
      {
        "name": "BBA",
        "slug": "bba",
        "level": "Bachelors"
      },
      {
        "name": "MBA",
        "slug": "mba",
        "level": "Masters"
      }
    ]
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        collection: {
          institutes: {objects: {'khwopa-college': data}, pagination: {}, pages: {}, key: 'slug'}
        }
      }
    })
  });

  // const wrapper = shallow(CollegeDetail, {
  //   store, localVue
  // });

  it('It is a component', () => {
    const wrapper = mount(CollegeDetail, {
      store, router, localVue
    });
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  // it('Has name', () => {
  //   expect(wrapper.vm.name).toBe(data.name);
  // });
  //
  // it('Renders name', () => {
  //   expect(wrapper.find('h1').text()).toContain(data.name);
  // });
  //
  // it('Renders logo image', () => {
  //   expect(wrapper.find('img.logo').attributes().src).toBe(data.logo);
  // });
  //
  // it('Styles cover image', () => {
  //   expect(wrapper.find('section.header').element.style.background).toBe('url(' + data.cover_image + ')');
  // });

});