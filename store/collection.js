export const state = () => ({
  institutes: { objects: {}, pagination: {}, pages: {}, key: 'slug', aggregation: {} },
  programs: { objects: {}, pagination: {}, pages: {}, key: 'slug', aggregation: {} }
});

export const getters = {
  get_items_for_page: (state) => (collection_name, page) => {
    let keys = state[collection_name].pages[page + ''];
    if (keys) {
      return Object.entries(state[collection_name].objects).filter(o => keys.includes(o[0])).map(o => o[1]);
    } else {
      return [];
    }
  },
  get_pagination: (state) => (collection_name, page) => {
    let pagination_data = Utils.clone(state[collection_name].pagination);
    // update pagination data with current page number
    pagination_data.page = page;
    return pagination_data;
  },
  get_aggregation: (state) => (collection_name, ) => {
    return state[collection_name].aggregation;
  }
};

export const mutations = {
  update_item(state, [collection_name, key, data]) {
    let collection = state[collection_name];
    collection.objects[key] = data;
    let obj = collection.objects[key] = collection.objects[key] || {};
    Object.assign(obj, data);
  },
  update_list(state, [collection_name, data, key_name, page]) {
    let collection = state[collection_name];
    collection.pagination = data.pagination;
    if (data.global_agg) {
      collection.aggregation = data.global_agg;
    }

    let page_list = Vue.set(collection.pages, page + '', []);

    for (let item of data.results) {
      let key = item[key_name];
      page_list.push(key);
      let obj = collection.objects[key] = collection.objects[key] || {};
      Object.assign(obj, item);
      // TODO remove from other pages?
    }
  },
  update_list_ssr(state, [collection_name, data, key_name, page]) {
    // TODO implement merge instead of replace
    let collection = state[collection_name];
    collection.pagination = data.pagination;
    collection.aggregation = data.aggregation;
    let page_array = Object.entries(data.pages)[0];
    if (page_array) {
      collection.pages[page_array[0]] = page_array[1];
    }
    //  TODO remove from other pages? page_array[1]
    Object.assign(collection.objects, data.objects);
  },
};

export const actions = {
  async get_list({ commit }, [collection_name, key_name, page]) {
    let url = `/${collection_name}/?page=${page}`;
    let { data } = await api.get(url);
    commit('update_list', [collection_name, data, key_name, page]);
  },
  async get_item({ commit }, [collection_name, key]) {
    let url = `/${collection_name}/${key}/`;
    let { data } = await api.get(url);
    commit('update_item', [collection_name, key, data]);
  },
  async update_list_from_ssr({ commit }, [collection_name, key, page]) {
    let data = window.__NUXT__.state.collection[collection_name];
    commit('update_list_ssr', [collection_name, data, key, page]);
  },
  async update_item_from_ssr({ commit }, [collection_name, key]) {
    let data = window.__NUXT__.state.collection[collection_name].objects[key];
    commit('update_item', [collection_name, key, data]);
  },
};