<!-- PAnalysis.vue -->
import Vue from 'vue'
<template>
  <div id="app">
    <div class="menuColumn">
      <div class="Year" v-for= "value in Years" :key="value" :style="isClicked ? { 'background-color': '#e6e6e6' } : null" @click="changeYear(value)">{{value}}</div>
      <br>
      <table>
        <tr align="left">
          <div class="League"><td>AL:</td></div>
          <div class="Team" v-for="value in Teams(ALTeams, selectedYear)" :key="value" @click="changeTeam(value)"><td>{{value}}</td></div>
        </tr>
        <tr align="left">
          <div class="League"><td>NL:</td></div>
          <div class="Team" v-for="value in Teams(NLTeams, selectedYear)" :key="value" @click="changeTeam(value)"><td>{{value}}</td></div>
        </tr>
      </table>
      <br>
      <div class="Player" v-for="value in Players(pitchersData, selectedYear, selectedTeam)" :key="value" @click="changePlayer(value)">{{value}}</div>
    </div>
    <hr id="hr1">
    <div class="mainColumn">
      <div class="Analyze" v-html='resultURL[0]'>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PAnalysis',
  props: {
    msg: String
  },
  data: () => {
    return {
      Years: [],
      ALTeams: [],
      NLTeams: [],
      resultURL: [],

      selectedYear: [],
      selectedTeam: [],
      selectedPlayer: [],
      isClicked: false,

      foods: [
        { kind: 'vegitable', name: ['Tomato', 'Cabbage', 'Onion'] },
        { kind: 'fruits', name: ['Apple', 'Orange', 'Peach'] }
      ],
      test: [
        { year: 2019, teams: ['AA', 'AB'] },
        { year: 2018, teams: ['BA', 'BB'] }
      ],
      pitchersData: [
        {
          year: 2019,
          league: 'NL',
          team: 'LAD',
          name: 'Clayton Kershaw',
          url: '<iframe width="800" height="636" src="https://app.powerbi.com/view?r=eyJrIjoiMzA3NjBiN2MtNzkwNS00OTQ2LThlNjUtOGE1YTJmYTA2NjIwIiwidCI6Ijc5NWU0N2Q5LTVlODctNDAyOS04MzU1LTU3NTM3Yzc0M2UwOSJ9&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe>'
        },
        {
          year: 2019,
          league: 'NL',
          team: 'CHC',
          name: 'Darvish Yu',
          url: '<iframe width="800" height="636" src="https://app.powerbi.com/view?r=eyJrIjoiZjIxN2IxZjQtNmIyNS00ZTFlLWE1MmYtN2VlMmQ5OWM5ZGE2IiwidCI6Ijc5NWU0N2Q5LTVlODctNDAyOS04MzU1LTU3NTM3Yzc0M2UwOSJ9&pageName=ReportSectiona161acc2bcb326b022ce" frameborder="0" allowFullScreen="true"></iframe>'
        },
        {
          year: 2019,
          league: 'NL',
          team: 'LAD',
          name: 'Kenta Maeda',
          url: '<iframe width="800" height="636" src="https://app.powerbi.com/view?r=eyJrIjoiZjkxOTRkNGEtNDhkYi00OWQ1LThmNzQtZWU5NTkyY2M4ZjIxIiwidCI6Ijc5NWU0N2Q5LTVlODctNDAyOS04MzU1LTU3NTM3Yzc0M2UwOSJ9" frameborder="0" allowFullScreen="true"></iframe>'
        },
        {
          year: 2019,
          league: 'AL',
          team: 'NYY',
          name: 'Gerrit Cole',
          url: '<iframe width="800" height="636" src="https://app.powerbi.com/view?r=eyJrIjoiYzQ1YTVmM2QtZjAzOC00ZDcwLTgzNGQtNTMzZWMwYzYyMGEwIiwidCI6Ijc5NWU0N2Q5LTVlODctNDAyOS04MzU1LTU3NTM3Yzc0M2UwOSJ9&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe>'
        }
      ]
    }
  },
  created () {
    this.Years = this.uniqueYears(this.pitchersData)
    this.selectedYear = this.Years[0] // set initial value of selectedYear

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
    this.selectedTeam = this.ALTeams[0].teams[0]
  },

  computed: {
    Players: () => {
      return (val, target1, target2) => {
        let retVal = []
        retVal = val
          .filter(item => {
            return (item.year === target1 && item.team === target2)
          })
          .map(item => item.name)
        // retVal2 = retVal.map(item => item.name)
        return retVal
      }
    },

    Teams: () => {
      return (val, target) => {
        const retVal = val.filter(item => {
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
    // Just for test
    whatfood (val, targetKind) {
      const retVal = val.filter(item => {
        return item.kind === targetKind
      })
      return retVal[0].name
    },

    changeYear (val) {
      this.isClicked = !this.isClicked
      this.selectedYear = val
    },

    changeTeam (val) {
      this.selectedTeam = val
    },

    changePlayer (val) {
      this.selectedPlayer = val
      this.resultURL = this.pitchersData
        .filter(item => {
          return (item.year === this.selectedYear && item.team === this.selectedTeam && item.name === this.selectedPlayer)
        })
        .map(item => item.url)
      if (this.resultURL.length > 1) {
        console.log('result URL Error')
      }
    },

    // uniqueTeam creates the array like [year:2019, teams: {NYY, BOS}]
    // Each team appeared only once every each year.
    // You can use .filter and .map consecutively for almost same resuluts.
    // However if no teams are there, teams becomes "undefined" so that
    //  "Cannot read property 'teams' of undefined" is emerged.
    uniqueTeam (val1, val2) {
      const teams = this.pitchersData
        .map((item) => {
          if (item.year === val1 && item.league === val2) {
            return item.team
          }
        }) // 1. 各要素オブジェクトから、"year"に合致するチームのみを返す
        .filter(Boolean) // 2. teamが空の項目を削除
        .reduce(this.findoutUnique, []) // 3. uniqueな値のみを抽出
        .sort()
      const returnArray = {
        year: val1,
        teams: teams
      }
      return returnArray
    },

    // findoutUnique
    // uniqueな値のみ抽出するreduce用のCallback関数
    findoutUnique (acum, val) {
      if (acum.includes(val) === false) {
        acum.push(val)
      }
      return acum
    },

    uniqueYears (items) {
      const numDescendingOrder = function (a, b) {
        // 数値を降順にsortする関数
        return b - a
      }
      const years = items
        .map((item) => {
          return item.year
        }) // 1. 各要素オブジェクトから、"year"のみを抽出
        .filter(Boolean)
        .reduce(this.findoutUnique, []) // 2. uniqueな値のみを抽出
      years.sort(numDescendingOrder) // 3. "year"の値が格納された配列をソート
      return years
    }
  }
}
</script>

<style lang="scss">
.menuColumn {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  table tr {height: 10pt }
  padding: 10pt;
  height: 90pt;
  line-height: auto;
  color: #147aeed8;
  cursor: pointer;
}
.menuColumn > div {
  display: inline-block;
  font-weight: bold;
  text-decoration: underline;
  line-height: auto;
  text-align:left;
  height: auto;
  padding: 3px;
  line-height: 3pt;
}

.League{
  display: inline-block;
  line-height: 5pt;
  margin-right: 7pt;

}
.Team {
  font-weight: bold;
  text-decoration: underline;
  display: inline-block;
  cursor: pointer;
  line-height: 3pt;
}

#hr1 {
  display: block;
  border-color: #66666675;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}
</style>
