<template>
    <div class="bg-grey p1">
        <div class="container columns">
            <div class="column is-one-third">
                <FilterCard name="Level" param="level" :agg="aggregation" :filters="filters" @filter="filter"/>
                <FilterCard name="Ownership" param="type" :agg="aggregation" :filters="filters" @filter="filter"/>
                <FilterCard name="Affiliation" param="affiliation" :agg="aggregation" :filters="filters" @filter="filter"/>
                <FilterCard name="District" param="district" :agg="aggregation" :filters="filters" @filter="filter" :search="true"/>
            </div>
            <div class="column is-two-thirds">
                <h1>{{title}}</h1>
                <div class="card mt1 mh1" v-for="obj in objs" :key="obj.slug">
                    <div class="card-content info list-item">
                        <nuxt-link :to="{name: 'slug', params: {slug: obj.slug}}" class="list-image">
                            <img :src="obj.logo_set.small" :alt="obj.name" :title="obj.name"/>
                        </nuxt-link>
                        <div class="list-detail">
                            <div>
                                <h3>
                                    <nuxt-link :to="{name: 'slug', params: {slug: obj.slug}}">{{obj.name}}</nuxt-link>
                                </h3>
                                <div v-if="obj.address">
                                    <FA i="location-arrow"/>
                                    {{obj.address}}
                                </div>
                                <div v-if="obj.type">
                                    <FA i="building"/>
                                    {{obj.type}}
                                </div>
                                <div class="boards" v-if="obj.boards && obj.boards.length">
                                    <FA i="university"/>
                                    <div class="csv">
                                        <div v-for="board in obj.boards" :key="board.slug">{{board.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination :pagination="pagination" @paginate="paginate"/>
            </div>
        </div>

    </div>
</template>

<script>
import Verified from "~/components/Verified.vue";
import Collection from "../mixins/Collection";

export default {
  collection: "institutes",
  mixins: [Collection],
  components: { Verified },
  computed: {
    title() {
      let str = "Colleges";
      let location = "Nepal";
      if (this.hasFilters) {
        if (this.filters.type) {
          str = Utils.englishList(this.filters.type) + " " + str;
        }
        if (this.filters.district) {
          location = Utils.englishList(this.filters.district);
        }
      }
      return str + " in " + location;
    }
  }
};
</script>