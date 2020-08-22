<!-- PAnalysis.vue -->
import Vue from 'vue'

<template>
  <div id="app">
    <div class="menu-column">
      <div
        class="year"
        v-for="value in Years"
        :key="value"
        :class="changeColor(value, selectedYear)"
        @click="changeYear(value)"
      >
        {{ value }}
      </div>
      <table>
        <tr align="left">
          <div class="league">
            <td>
              <div style="color: black;">AL:</div>
            </td>
          </div>
          <div
            class="team"
            v-for="value in chooseTeams(ALTeams, selectedYear)"
            :key="value"
            :class="changeColor(value, selectedTeam)"
            @click="changeTeam(value)"
          >
            <td>{{ value }}</td>
          </div>
        </tr>
        <tr align="left">
          <div class="league">
            <td>
              <div style="color: black;">NL:</div>
            </td>
          </div>
          <div
            class="team"
            v-for="value in chooseTeams(NLTeams, selectedYear)"
            :key="value"
            :class="changeColor(value, selectedTeam)"
            @click="changeTeam(value)"
          >
            <td>{{ value }}</td>
          </div>
        </tr>
      </table>
      <table class="players-table">
        <div
          class="player"
          v-for="value in choosePlayers(this.pitchersData, this.selectedYear, this.selectedTeam)"
          :key="value"
          :class="changeColor(value, selectedPlayer)"
          @click="changePlayer(value)"
        >
          <td>{{ value }}</td>
        </div>
      </table>
    </div>
    <hr class="hr1" />
    <div class="main-column">
      <div class="analyze" v-html="resultURL[0]"></div>
    </div>
  </div>
</template>

<script>
import readJSON from '@/data/pitchersData.json'
export default {
  name: 'PAnalysis',
  props: {
    msg: String
  },
  components: { readJSON },
  data: () => {
    //    const { pitchersData } = jsonData

    return {
      pitchersData: [],
      // to display
      Years: [],
      ALTeams: [],
      NLTeams: [],

      // to keep the clicked item
      selectedYear: [],
      selectedTeam: [],
      selectedPlayer: [],
      resultURL: [],
      isClicked: false,
      // just for Test
      foods: [
        { kind: 'vegitable', name: ['Tomato', 'Cabbage', 'Onion'] },
        { kind: 'fruits', name: ['Apple', 'Orange', 'Peach'] }
      ],
      test: [
        { year: 2019, teams: ['AA', 'AB'] },
        { year: 2018, teams: ['BA', 'BB'] }
      ]
    }
  },
  created() {
    this.pitchersData = readJSON
    // create array where elements are sorted by year, like:
    // [2019, 2018, 2017]
    this.Years = this.uniqueYears(this.pitchersData)
    // set initial value of selectedYear, latest year is selected.
    // if no years are in pichtersData, it will be in trouble.
    this.selectedYear = this.Years[0]

    // create teams' objects with teams for every year, like
    // {year 2019, teams: [CHC, LAD]}
    // {year 2018, teams: [LAD, NYM]}
    // Should not use forEach, but no idea.
    this.Years.forEach((targetYear) => {
      const leagues = ['AL', 'NL']
      leagues.forEach((targetLeague) => {
        if (targetLeague === 'AL') {
          this.ALTeams.push(this.uniqueTeam(targetYear, targetLeague))
        } else {
          this.NLTeams.push(this.uniqueTeam(targetYear, targetLeague))
        }
      })
    })
    // set initial value of selectedTeam.
    // If there's no AL team in pichtersData, that will be in trouble.
    this.selectedTeam = this.ALTeams[0].teams[0]
  },

  computed: {
    // I'm not sure why only the following can move to computed
    // but others are not.
    // Take care you cannot directly use any arguments in function
    // in computed, but use like the followings.

    //  Picking out players in the selected year and teams.
    choosePlayers: () => {
      return (val, target1, target2) => {
        let retVal = []
        retVal = val
          .filter((item) => {
            return item.year === target1 && item.team === target2
          })
          .map((item) => item.name)
          .sort()
        // retVal2 = retVal.map(item => item.name)
        return retVal
      }
    },

    //  Picking out teams in the selected year.
    chooseTeams: () => {
      return (val, target) => {
        const retVal = val.filter((item) => {
          return item.year === target
        })
        if (retVal.length > 1) {
          console.log('Error: Creating teams array')
        }
        return retVal[0].teams
      }
    }
  },

  methods: {
    // https://uncle-javascript.com/vue-color-change-methods
    changeColor(val1, val2) {
      if (val1 === val2) {
        return 'selected-color' // change the class for CSS
      } else {
        return 'unselected-color' // change the class for CSS
      }
    },

    changeYear(val) {
      this.isClicked = !this.isClicked
      this.selectedYear = val // keep a selected year
    },

    changeTeam(val) {
      this.selectedTeam = val // keep a selected team
    },

    changePlayer(val) {
      this.selectedPlayer = val // Set slectedPlayer to a clicked player.
      this.resultURL = this.pitchersData
        .filter((item) => {
          return (
            item.year === this.selectedYear &&
            item.team === this.selectedTeam &&
            item.name === this.selectedPlayer
          )
        }) // filter by year and team and player
        .map((item) => item.url) // array for player's URL.
      if (this.resultURL.length > 1) {
        console.log('result URL Error')
      }
    },

    // uniqueTeam creates the array like [year:2019, teams: {NYY, BOS}]
    // Each team appeared only once every each year.
    // You can use .filter and .map consecutively for almost same resuluts.
    // However if no teams are there, teams becomes "undefined" so that
    //  "Cannot read property 'teams' of undefined" is emerged.
    uniqueTeam(val1, val2) {
      const teams = this.pitchersData
        .map((item) => {
          if (item.year === val1 && item.league === val2) {
            return item.team
          }
        }) // 1. return property that matches year and league as an array by team.
        .filter(Boolean) // 2. delete empty elements.
        .reduce(this.findoutUnique, []) // 3. duplicate teams should be delete.
        .sort()
      const returnArray = {
        year: val1,
        teams: teams
      }
      return returnArray
    },

    // Callback function for reduce to delete duplicated values.
    findoutUnique(acum, val) {
      if (acum.includes(val) === false) {
        acum.push(val)
      }
      return acum
    },

    uniqueYears(items) {
      const numDescendingOrder = function (a, b) {
        // sort numbers(years here) by descending order
        return b - a
      }
      const years = items
        .map((item) => {
          return item.year
        }) // 1. return property that matches year and league as an array by team.
        .filter(Boolean)
        .reduce(this.findoutUnique, []) // 2. duplicate teams should be delete.
      years.sort(numDescendingOrder) // 3. sort the array which contains the list of year.
      return years
    },

    // just for test
    whatfood(val, targetKind) {
      const retVal = val.filter((item) => {
        return item.kind === targetKind
      })
      return retVal[0].name
    }
  }
}
</script>

<style lang="scss">
.menu-column {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: normal;
  table tr {
    height: 10pt;
  }
  padding-top: 0pt;
  height: auto;
  line-height: auto;
  color: #147aeed8;
  cursor: pointer;
}
@media screen and (min-width: 481px) {
  .menu-column {
    font-weight: bold;
  }
}
@media screen and (min-width: 769px) {
  .menu-column {
    font-weight: bold;
  }
}
.menu-column > div {
  display: inline-block;
  text-decoration: underline;
  line-height: auto;
  text-align: left;
  height: auto;
  padding: 3px;
  line-height: 3pt;
}
.league {
  display: inline-block;
  line-height: 5pt;
  margin-right: 7pt;
  margin-top: 5pt;
  font-weight: normal;
}
.team {
  text-decoration: underline;
  display: inline-block;
  cursor: pointer;
  line-height: 3pt;
  margin-right: 3pt;
}
.player {
  display: inline-block;
  margin-right: 7pt;
}
.players-table {
  margin-left: auto;
  margin-right: auto;
}
.selected-color {
  color: #cf7575;
}
.unselected-color {
  color: #147aeed8;
}
.main-column {
  padding-top: auto;
}

/*
"padding-top" works for resoponsive design.
"position" is the another key.
In case of setting "position: absolute;", their parents element
should set to "position: relative;"
See:
https://qiita.com/Fj0gxKrVL1VsbRb/items/59c8bad3355ea4698623
https://saruwakakun.com/html-css/basic/relative-absolute-fixed
https://taneppa.net/responsive_background_image/
*/
.analyze {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  display: block;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (min-width: 481px) {
  .analyze {
    padding-top: 79.5%;
  }
}
@media screen and (min-width: 769px) {
  .analyze {
    padding-top: 45%;
  }
}
.analyze iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.hr1 {
  display: block;
  border-color: #adacac75;
  margin-top: auto;
  margin-bottom: 10pt;
  margin-left: auto;
  margin-right: auto;
  border-width: 1px;
}
</style>
