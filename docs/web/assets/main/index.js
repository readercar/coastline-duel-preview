System.register("chunks:///_virtual/Amount.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        add: add,
        fmt: fmt,
        mul: mul,
        ratio: ratio,
        sub: sub
      });
      cclegacy._RF.push({}, "90293t9JHpMvqYSni2pp2qC", "Amount", undefined);
      /** Non-negative amounts stored in log10 space. ZERO is JSON-safe. */
      var ZERO = exports('ZERO', -1e300);
      var amount = exports('amount', function amount(n) {
        return n > 0 ? Math.log10(n) : ZERO;
      });
      function add(a, b) {
        if (a === ZERO) return b;
        if (b === ZERO) return a;
        var hi = Math.max(a, b),
          lo = Math.min(a, b);
        return hi - lo > 16 ? hi : hi + Math.log10(1 + Math.pow(10, lo - hi));
      }
      function sub(a, b) {
        if (b === ZERO) return a;
        if (b >= a - 1e-12) return ZERO;
        return a + Math.log10(1 - Math.pow(10, b - a));
      }
      function mul(a, n) {
        return a === ZERO || n <= 0 ? ZERO : a + Math.log10(n);
      }
      function fmt(a, scientific) {
        if (scientific === void 0) {
          scientific = false;
        }
        if (a === ZERO || a < -2) return '0';
        if (scientific && a >= 3) return Math.pow(10, a % 1).toFixed(2) + "e" + Math.floor(a);
        if (a < 3) return Math.floor(Math.pow(10, a) + 1e-8).toString();
        var group = Math.floor(a / 3),
          suffix = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'];
        return group < suffix.length ? "" + Math.pow(10, a - group * 3).toFixed(1) + suffix[group] : Math.pow(10, a % 1).toFixed(2) + "e" + Math.floor(a);
      }
      var display = exports('display', function display(n) {
        return fmt(amount(n));
      });
      function ratio(a, b) {
        return Math.min(1, Math.max(0, Math.pow(10, a - b)));
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Balance.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        gemstoneBonus: gemstoneBonus,
        gemstoneRarity: gemstoneRarity,
        gemstoneSlots: gemstoneSlots,
        routedBonus: routedBonus
      });
      cclegacy._RF.push({}, "6a04a4BzdZPK5hlba5XBedQ", "Balance", undefined);
      // Reference discovery costs: TT2_CSV snapshot 2026-10-02. Other effect coefficients are independent.
      var BALANCE_VERSION = exports('BALANCE_VERSION', 'chapter1-2026-10-02');
      var ARTIFACT_DISCOVERY_COSTS = exports('ARTIFACT_DISCOVERY_COSTS', [1.000E+00, 3.000E+00, 6.000E+00, 1.100E+01, 1.900E+01, 3.000E+01, 4.600E+01, 6.900E+01, 1.020E+02, 1.480E+02, 2.140E+02, 3.060E+02, 4.340E+02, 6.130E+02, 8.610E+02, 1.200E+03, 1.680E+03, 2.320E+03, 3.210E+03, 4.430E+03, 6.090E+03, 8.360E+03, 1.150E+04, 1.570E+04, 2.140E+04, 2.910E+04, 3.960E+04, 5.380E+04, 7.300E+04, 9.890E+04, 1.340E+05, 1.810E+05, 2.450E+05, 3.300E+05, 4.450E+05, 6.000E+05, 8.080E+05, 1.090E+06, 1.460E+06, 1.960E+06, 2.800E+06, 4.270E+06, 6.550E+06, 1.010E+07, 1.560E+07, 2.430E+07, 3.800E+07, 5.970E+07, 9.430E+07, 2.539E+08, 7.615E+08, 2.487E+09, 8.625E+09, 3.155E+10, 1.207E+11, 4.788E+11, 1.957E+12, 8.281E+12, 3.550E+13, 1.518E+14, 6.520E+14, 2.817E+15, 1.223E+16, 5.300E+16, 2.311E+17, 4.831E+18, 1.008E+20, 2.115E+21, 4.456E+22, 9.399E+23, 1.999E+25, 4.252E+26, 9.082E+27, 1.950E+29, 4.195E+30, 9.042E+31, 1.970E+33, 4.269E+34, 9.313E+35, 1.225E+38, 1.078E+40, 1.418E+42, 8.818E+43, 5.157E+45, 2.363E+47, 8.931E+48, 3.074E+50, 9.947E+51, 3.099E+53, 7.899E+54, 1.016E+57, 1.226E+59, 1.327E+61, 3.465E+62, 8.722E+63, 2.076E+65, 4.497E+66, 8.152E+67, 8.499E+68, 8.526E+69, 9.395E+70, 2.032E+72, 4.279E+73, 8.736E+74, 1.667E+76, 2.842E+77, 5.040E+78, 4.940E+80, 4.860E+82, 4.790E+84, 7.860E+86, 1.330E+89, 2.260E+91, 3.870E+93, 6.630E+95, 1.140E+98, 1.970E+100, 3.430E+102, 5.970E+104, 1.050E+107, 1.840E+109, 3.240E+111, 5.750E+113, 1.020E+116, 1.830E+118, 3.280E+120, 5.900E+122, 1.070E+125, 1.940E+127, 3.530E+129, 6.460E+131, 1.190E+134, 2.190E+136, 4.050E+138, 7.530E+140, 1.400E+143, 2.630E+145, 4.950E+147, 9.340E+149, 1.770E+152, 3.370E+154, 6.430E+156, 1.230E+159, 2.370E+161, 4.580E+163, 8.880E+165, 1.730E+168, 3.370E+170, 6.620E+172, 1.300E+175, 2.550E+177, 5.010E+179, 9.840E+181, 6.860E+184, 8.200E+187, 9.810E+190, 1.180E+194, 1.410E+197, 1.690E+200, 2.030E+203, 2.440E+206, 2.930E+209, 3.520E+212, 4.233E+215, 5.093E+218, 6.138E+221, 7.399E+224, 8.929E+227, 1.078E+231, 1.302E+234, 1.575E+237, 1.904E+240, 2.305E+243, 2.790E+246, 3.380E+249, 4.100E+252, 4.973E+255, 6.035E+258, 7.328E+261, 8.909E+264, 1.083E+268, 1.319E+271, 1.607E+274, 1.959E+277, 2.390E+280, 2.918E+283, 3.567E+286, 4.361E+289, 5.335E+292, 6.535E+295, 8.005E+298, 9.810E+301, 1.203E+305, 1.477E+308]);
      var GROWTH_STATS = exports('GROWTH_STATS', ['tap', 'hero', 'gold']);
      var GEM_BREAKPOINTS = exports('GEM_BREAKPOINTS', [100, 200, 400, 500]);
      function gemstoneRarity(level) {
        return GEM_BREAKPOINTS.filter(function (n) {
          return level >= n;
        }).length;
      }
      // Reference rarity table unlocks 1,1,2,3,4 bonus slots. Stable ID routing below is independent.
      function gemstoneSlots(level) {
        return level <= 0 ? 0 : [1, 1, 2, 3, 4][gemstoneRarity(level)];
      }
      var GEM_EFFECTS = exports('GEM_EFFECTS', Array.from({
        length: 24
      }, function (_, id) {
        return {
          id: id,
          primary: GROWTH_STATS[id % 3],
          secondary: [GROWTH_STATS[(id + 1) % 3], GROWTH_STATS[(id + 2) % 3], GROWTH_STATS[id % 3]]
        };
      }));
      function gemstoneBonus(id, level, stat) {
        var def = GEM_EFFECTS[id];
        if (!def || level <= 0) return 0;
        var bonus = def.primary === stat ? Math.log10(1 + level * .025) : 0;
        for (var slot = 0; slot < gemstoneSlots(level) - 1; slot++) if (def.secondary[slot] === stat) bonus += Math.log10(1 + level * .01);
        return bonus;
      }
      function routedBonus(levels, stat, rate, logarithmic) {
        if (logarithmic === void 0) {
          logarithmic = false;
        }
        return levels.reduce(function (sum, level, id) {
          return sum + (GROWTH_STATS[id % 3] === stat ? logarithmic ? Math.log10(1 + level * rate) : level * rate : 0);
        }, 0);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Config.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "61fc6m9PitHRYxb4PWbCzd6", "Config", undefined);
      var CONFIG = exports('CONFIG', {
        version: 'independent-2026-10-02.1',
        stageBaseHP: 22,
        stageGrowth: 1.115,
        titansPerStage: 5,
        bossMultiplier: 8,
        bossSeconds: 30,
        goldBase: 6,
        prestigeStage: 60,
        petStage: 8,
        equipmentStage: 15,
        clanStage: 100,
        abyssStage: 1000,
        soulsStage: 100000,
        transcendStage: 180000,
        eggSeconds: 14400,
        maxOfflineSeconds: 28800,
        inventoryCap: 100,
        manaMax: 120,
        manaRegen: 1.5
      });
      var HEROES = exports('HEROES', Array.from({
        length: 24
      }, function (_, i) {
        return {
          id: i,
          name: "hero." + i,
          unlock: Math.max(1, i * 12),
          cost: 18 * Math.pow(12, i),
          damage: 2 * Math.pow(10, i),
          growth: 1.075
        };
      }));
      var SPELLS = exports('SPELLS', [{
        id: 0,
        unlock: 100,
        mana: 15,
        duration: 0,
        cooldown: 3
      }, {
        id: 1,
        unlock: 150,
        mana: 20,
        duration: 30,
        cooldown: 20
      }, {
        id: 2,
        unlock: 200,
        mana: 20,
        duration: 30,
        cooldown: 20
      }, {
        id: 3,
        unlock: 250,
        mana: 25,
        duration: 30,
        cooldown: 20
      }, {
        id: 4,
        unlock: 300,
        mana: 30,
        duration: 30,
        cooldown: 20
      }, {
        id: 5,
        unlock: 350,
        mana: 35,
        duration: 60,
        cooldown: 20
      }, {
        id: 6,
        unlock: 400,
        mana: 30,
        duration: 30,
        cooldown: 20
      }, {
        id: 7,
        unlock: 450,
        mana: 30,
        duration: 30,
        cooldown: 20
      }, {
        id: 8,
        unlock: 500,
        mana: 40,
        duration: 80,
        cooldown: 20
      }, {
        id: 9,
        unlock: 550,
        mana: 35,
        duration: 30,
        cooldown: 20
      }]);
      var SKILLS = exports('SKILLS', Array.from({
        length: 18
      }, function (_, i) {
        return {
          id: i,
          branch: Math.floor(i / 3),
          tier: i % 3,
          max: i % 3 === 2 ? 10 : 20,
          prerequisite: i % 3 ? i - 1 : -1
        };
      }));
      var ARTIFACTS = exports('ARTIFACTS', Array.from({
        length: 30
      }, function (_, i) {
        return {
          id: i,
          name: "artifact." + i,
          effect: i % 4
        };
      }));
      var PETS = exports('PETS', Array.from({
        length: 12
      }, function (_, i) {
        return {
          id: i,
          name: "pet." + i,
          effect: i % 3
        };
      }));
      var CARDS = exports('CARDS', Array.from({
        length: 18
      }, function (_, i) {
        return {
          id: i,
          name: "card." + i,
          type: i % 3
        };
      }));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Expansion.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Balance.ts', './Monetization.ts', './Amount.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, gemstoneRarity, newCommerce, ZERO, amount, sub, add, mul;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      gemstoneRarity = module.gemstoneRarity;
    }, function (module) {
      newCommerce = module.newCommerce;
    }, function (module) {
      ZERO = module.ZERO;
      amount = module.amount;
      sub = module.sub;
      add = module.add;
      mul = module.mul;
    }],
    execute: function () {
      exports('newExpansion', newExpansion);
      cclegacy._RF.push({}, "069daPGHUlNQadGQEa77ECl", "Expansion", undefined);
      var seasonAt = exports('seasonAt', function seasonAt(time) {
        return Math.floor(time / (28 * 86400000));
      });
      function newExpansion(now) {
        return {
          commerce: newCommerce(),
          rewardNotices: [],
          unseenEquipment: [],
          unlockNotices: [],
          unlocked: [],
          soloRaid: null,
          soloCleared: [],
          soloRewardDay: -1,
          deckPresets: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
          lastEquipmentStage: 0,
          perkSlots: [0, 1, 2, 3, 4, 5],
          extraPerks: [2, 2, 2, 2],
          ascensions: Array(24).fill(0),
          heroSkills: Array(24).fill(0),
          petBoard: [0, 3, 5, 1, 7, 2, 6, 4, 3, 6, 1, 7, 4, 0, 2, 5],
          petMatched: [],
          petFace: [],
          petEnergy: 16,
          petMilestones: [],
          monumentInvested: Array(12).fill(ZERO),
          monumentEnchanted: Array(12).fill(0),
          season: seasonAt(now),
          seasonBest: 0,
          crystal: [-1, -1, -1],
          summonCount: 0,
          titanLevels: Array(120).fill(0),
          banner: 0,
          geodesOpened: 0,
          mysticResearch: Array(12).fill(0),
          gemMilestones: [],
          mails: [{
            id: 'welcome',
            title: 'extra.mail.welcome',
            expires: now + 7 * 86400000,
            gems: 25,
            shards: 5,
            claimed: false
          }],
          cosmetics: [0, 0, 0],
          scientific: false,
          effects: true,
          notifications: Array(6).fill(false),
          dailyFairies: 0,
          dailyEquipment: 0,
          dailyEggs: 0,
          day: Math.floor(now / 86400000),
          eventEarned: 0,
          eventSeason: seasonAt(now),
          eventEndClaims: [],
          recipes: [],
          towerFloor: 1,
          towerKeys: 5,
          dropHistory: [],
          collectionClaims: []
        };
      }
      var Expansion = exports('Expansion', /*#__PURE__*/function () {
        function Expansion(g) {
          this.g = g;
        }
        var _proto = Expansion.prototype;
        _proto.tx = function tx(key, action) {
          return this.g.transaction(key, action);
        };
        _proto.sync = function sync() {
          var g = this.g,
            x = this.x,
            now = g.now(),
            day = Math.floor(now / 86400000),
            season = seasonAt(now);
          if (day > x.day) {
            x.day = day;
            x.soloCleared = [];
            x.dailyFairies = x.dailyEquipment = x.dailyEggs = 0;
            x.petEnergy = 16;
            x.towerKeys = 5;
            x.petMatched = [];
            x.petFace = [];
            x.collectionClaims = [];
          }
          x.eventEarned = Math.max(x.eventEarned, g.s.eventTokens);
          x.seasonBest = Math.max(x.seasonBest, g.s.run.stage);
          if (season > x.season) {
            var old = x.season;
            var reward = Math.floor(x.seasonBest / 1000);
            x.mails.push({
              id: "season-" + old,
              title: 'extra.mail.season',
              expires: now + 7 * 86400000,
              gems: reward,
              shards: Math.min(100, reward),
              claimed: false
            });
            x.season = season;
            x.seasonBest = 0;
            g.s.monuments.fill(0);
            g.s.mementos = ZERO;
            x.monumentInvested.fill(ZERO);
            x.monumentEnchanted.fill(0);
          }
          if (season > x.eventSeason) {
            var _old = x.eventSeason;
            x.mails.push({
              id: "event-" + _old,
              title: 'extra.mail.event',
              expires: now + 3 * 86400000,
              gems: Math.floor(g.s.eventTokens / 100),
              shards: 0,
              claimed: false
            });
            x.eventSeason = season;
            x.eventEarned = 0;
            g.s.eventTokens = 0;
            g.s.board.fill(0);
            g.s.claims = g.s.claims.filter(function (k) {
              return !k.startsWith('event.');
            });
          }
        };
        _proto.discoverMonument = function discoverMonument(key) {
          var _this = this;
          return this.tx(key, function () {
            _this.g.require(_this.g.s.maxStage >= 180000, 'error.locked');
            var candidates = _this.g.s.monuments.map(function (level, i) {
              return level ? -1 : i;
            }).filter(function (i) {
              return i >= 0;
            });
            _this.g.require(candidates.length > 0, 'error.full');
            var cost = amount(Math.pow(2, 12 - candidates.length));
            _this.g.require(_this.g.s.mementos >= cost);
            var i = candidates[Math.floor(_this.g.random() * candidates.length)];
            _this.g.s.mementos = sub(_this.g.s.mementos, cost);
            _this.g.s.monuments[i] = 1;
            _this.x.monumentInvested[i] = cost;
          });
        };
        _proto.saveDeck = function saveDeck(slot, key) {
          var _this2 = this;
          return this.tx(key, function () {
            _this2.g.require(Number.isInteger(slot) && slot >= 0 && slot < 3, 'error.invalid');
            _this2.x.deckPresets[slot] = _this2.g.s.deck.slice();
          });
        };
        _proto.loadDeck = function loadDeck(slot, key) {
          var _this3 = this;
          return this.tx(key, function () {
            _this3.g.require(!_this3.g.raid || _this3.g.raid.claimed, 'error.protected');
            _this3.g.require(Number.isInteger(slot) && slot >= 0 && slot < 3, 'error.invalid');
            _this3.g.s.deck = _this3.x.deckPresets[slot].slice();
          });
        };
        _proto.dailyPortal = function dailyPortal(key) {
          var _this4 = this;
          return this.tx(key, function () {
            _this4.g.require(_this4.x.soloRewardDay !== _this4.x.day, 'error.claimed');
            _this4.g.require(_this4.x.soloCleared.length >= 3, 'error.locked');
            _this4.x.soloRewardDay = _this4.x.day;
            _this4.g.s.dust += 50;
            _this4.fortune(10);
          });
        };
        _proto.perkCount = function perkCount(id) {
          return id < 6 ? this.g.s.perks[id] : this.x.extraPerks[id - 6];
        };
        _proto.swapPerk = function swapPerk(slot, id, key) {
          var _this5 = this;
          return this.tx(key, function () {
            _this5.g.require(slot >= 0 && slot < 6 && id >= 0 && id < 10 && !_this5.x.perkSlots.includes(id), 'error.invalid');
            _this5.g.s.perkUntil[slot] = 0;
            _this5.x.perkSlots[slot] = id;
          });
        };
        _proto.usePerk = function usePerk(slot, key) {
          var _this6 = this;
          return this.tx(key, function () {
            var id = _this6.x.perkSlots[slot];
            _this6.g.require(_this6.perkCount(id) > 0);
            if (id < 6) _this6.g.s.perks[id]--;else _this6.x.extraPerks[id - 6]--;
            _this6.g.s.perkUntil[slot] = _this6.g.now() + 300000;
          });
        };
        _proto.ascend = function ascend(hero, key) {
          var _this7 = this;
          return this.tx(key, function () {
            _this7.g.require(_this7.g.s.run.heroes[hero] >= 1000, 'error.locked');
            _this7.g.s.run.heroes[hero] = 1;
            _this7.x.ascensions[hero]++;
          });
        };
        _proto.heroSkill = function heroSkill(hero, key) {
          var _this8 = this;
          return this.tx(key, function () {
            var tier = _this8.x.heroSkills[hero],
              target = [10, 25, 50, 100, 200, 400, 800][tier];
            _this8.g.require(!!target && _this8.g.s.run.heroes[hero] >= target, 'error.locked');
            var cost = _this8.g.upgradeCost(hero, 5);
            _this8.g.require(_this8.g.s.run.gold >= cost);
            _this8.g.s.run.gold = sub(_this8.g.s.run.gold, cost);
            _this8.x.heroSkills[hero]++;
          });
        };
        _proto.petTile = function petTile(tile, key) {
          var _this9 = this;
          return this.tx(key, function () {
            var x = _this9.x;
            _this9.g.require(_this9.g.s.maxStage >= 8, 'error.locked');
            _this9.g.require(tile >= 0 && tile < 16 && !x.petMatched.includes(tile), 'error.invalid');
            if (x.petFace.length === 2) x.petFace = [];
            _this9.g.require(!x.petFace.includes(tile), 'error.invalid');
            if (!x.petFace.length) {
              _this9.g.require(x.petEnergy > 0);
              x.petEnergy--;
            }
            x.petFace.push(tile);
            if (x.petFace.length === 2 && x.petBoard[x.petFace[0]] === x.petBoard[x.petFace[1]]) {
              var _x$petMatched;
              (_x$petMatched = x.petMatched).push.apply(_x$petMatched, x.petFace);
              _this9.g.s.pets[_this9.g.s.activePet]++;
              if (x.petMatched.length === 16) _this9.g.s.shards += 5;
            }
          });
        };
        _proto.petMilestone = function petMilestone(target, key) {
          var _this10 = this;
          return this.tx(key, function () {
            _this10.g.require([10, 25, 50, 100, 250, 500, 1000].includes(target), 'error.invalid');
            _this10.g.require(!_this10.x.petMilestones.includes(target), 'error.claimed');
            _this10.g.require(_this10.g.s.pets.reduce(function (a, b) {
              return a + b;
            }, 0) >= target, 'error.locked');
            _this10.x.petMilestones.push(target);
            _this10.g.s.gems += 25;
          });
        };
        _proto.salvageMonument = function salvageMonument(i, key) {
          var _this11 = this;
          return this.tx(key, function () {
            _this11.g.require(_this11.g.s.monuments[i] > 0 && !_this11.x.monumentEnchanted[i], 'error.protected');
            _this11.g.s.mementos = add(_this11.g.s.mementos, mul(_this11.x.monumentInvested[i], .8));
            _this11.g.s.monuments[i] = 0;
            _this11.x.monumentInvested[i] = ZERO;
          });
        };
        _proto.enchantCandidates = function enchantCandidates() {
          var _this12 = this;
          return this.g.s.monuments.map(function (l, i) {
            return l && !_this12.x.monumentEnchanted[i] ? i : -1;
          }).filter(function (i) {
            return i >= 0;
          }).slice(0, 3);
        };
        _proto.enchantMonument = function enchantMonument(i, key) {
          var _this13 = this;
          return this.tx(key, function () {
            _this13.g.require(_this13.g.s.monuments.every(function (l) {
              return l > 0;
            }) && _this13.enchantCandidates().includes(i), 'error.locked');
            _this13.g.require(_this13.g.s.mementos >= amount(1000));
            _this13.g.s.mementos = sub(_this13.g.s.mementos, amount(1000));
            _this13.x.monumentEnchanted[i] = 1;
          });
        };
        _proto.dustOffers = function dustOffers() {
          var cycle = Math.floor(this.g.now() / 21600000);
          return [cycle % 18, (cycle + 7) % 18, (cycle + 13) % 18];
        };
        _proto.dustBuy = function dustBuy(i, key) {
          var _this14 = this;
          return this.tx(key, function () {
            _this14.g.require(_this14.dustOffers().includes(i), 'error.invalid');
            _this14.g.require(_this14.g.s.dust >= 20);
            _this14.g.s.dust -= 20;
            _this14.g.s.fragments[i] += 5;
          });
        };
        _proto.crystal = function crystal(slot, card, key) {
          var _this15 = this;
          return this.tx(key, function () {
            _this15.g.require(_this15.g.s.cards.reduce(function (a, b) {
              return a + b;
            }, 0) >= 1000, 'error.locked');
            _this15.g.require(!_this15.g.raid || _this15.g.raid.ended, 'error.protected');
            _this15.g.require(card % 3 === slot, 'error.invalid');
            _this15.x.crystal[slot] = card;
          });
        };
        _proto.boostedLevel = function boostedLevel(card) {
          if (!this.x.crystal.includes(card)) return this.g.s.cards[card];
          var levels = this.g.s.cards.slice().sort(function (a, b) {
            return b - a;
          });
          return Math.max(this.g.s.cards[card], levels[5] || 1);
        };
        _proto.fortune = function fortune(count) {
          var _this16 = this;
          for (var n = 0; n < count; n++) {
            var weights = this.g.s.cards.map(function (l, i) {
                return l * 100000 + _this16.g.s.fragments[i];
              }),
              min = Math.min.apply(Math, weights),
              i = weights.indexOf(min);
            this.g.s.fragments[i]++;
          }
        };
        _proto.summon = function summon(count, banner, key) {
          var _this17 = this;
          return this.tx(key, function () {
            _this17.g.require([1, 10].includes(count) && banner >= 0 && banner < 7, 'error.invalid');
            _this17.g.require(_this17.g.s.maxStage >= 100000 || _this17.g.now() - _this17.g.s.created >= 30 * 86400000, 'error.locked');
            _this17.g.require(_this17.g.s.souls >= 10 * count);
            _this17.g.s.souls -= 10 * count;
            _this17.x.banner = banner;
            for (var n = 0; n < count; n++) {
              var i = Math.floor(_this17.g.random() * 120);
              if (banner && _this17.g.random() < .7) i = i % 20 * 6 + (banner - 1);
              _this17.g.s.titans[i]++;
              _this17.x.summonCount++;
            }
          });
        };
        _proto.titanCost = function titanCost(i) {
          return Math.pow(2, Math.min(20, this.x.titanLevels[i]));
        };
        _proto.levelTitans = function levelTitans(ids, key) {
          var _this18 = this;
          return this.tx(key, function () {
            _this18.g.require(ids.length > 0 && new Set(ids).size === ids.length, 'error.invalid');
            var changed = false;
            for (var _iterator = _createForOfIteratorHelperLoose(ids), _step; !(_step = _iterator()).done;) {
              var i = _step.value;
              _this18.g.require(i >= 0 && i < 120, 'error.invalid');
              var cost = _this18.titanCost(i);
              if (_this18.g.s.titans[i] >= cost) {
                _this18.g.s.titans[i] -= cost;
                _this18.x.titanLevels[i]++;
                changed = true;
              }
            }
            _this18.g.require(changed);
          });
        };
        _proto.gemstoneRarity = function gemstoneRarity$1(i) {
          return gemstoneRarity(this.g.s.stones[i]);
        };
        _proto.mysticNode = function mysticNode(i, key) {
          var _this19 = this;
          return this.tx(key, function () {
            _this19.g.require(Number.isInteger(i) && i >= 0 && i < _this19.x.mysticResearch.length, 'error.invalid');
            var cost = _this19.x.mysticResearch[i] + 1,
              spent = _this19.x.mysticResearch.reduce(function (a, l) {
                return a + l * (l + 1) / 2;
              }, 0);
            _this19.g.require(_this19.x.geodesOpened - spent >= cost);
            if (i % 3) _this19.g.require(_this19.x.mysticResearch[i - 1] >= 3, 'error.prerequisite');
            _this19.x.mysticResearch[i]++;
          });
        };
        _proto.gemMilestone = function gemMilestone(i, level, key) {
          var _this20 = this;
          return this.tx(key, function () {
            _this20.g.require(Number.isInteger(i) && i >= 0 && i < _this20.g.s.stones.length, 'error.invalid');
            var id = i + ":" + level;
            _this20.g.require([100, 200, 400, 500].includes(level), 'error.invalid');
            _this20.g.require(_this20.g.s.stones[i] >= level, 'error.locked');
            _this20.g.require(!_this20.x.gemMilestones.includes(id), 'error.claimed');
            _this20.x.gemMilestones.push(id);
            _this20.g.s.shards += 5;
          });
        };
        _proto.collectible = function collectible(i, key) {
          var _this21 = this;
          return this.tx(key, function () {
            var progress = [_this21.x.dailyFairies, _this21.x.dailyEquipment, _this21.x.dailyEggs][i],
              goal = [3, 3, 1][i];
            _this21.g.require(progress >= goal, 'error.locked');
            _this21.g.require(!_this21.x.collectionClaims.includes(String(i)), 'error.claimed');
            _this21.x.collectionClaims.push(String(i));
            _this21.g.s.gems += 10;
            if (i === 1) _this21.g.s.geodes++;
          });
        };
        _proto.claimMail = function claimMail(id, key) {
          var _this22 = this;
          return this.tx(key, function () {
            var mail = _this22.x.mails.find(function (m) {
              return m.id === id;
            });
            _this22.g.require(!!mail && !mail.claimed && mail.expires > _this22.g.now(), 'error.claimed');
            if (!mail) return;
            mail.claimed = true;
            _this22.g.s.gems += mail.gems;
            _this22.g.s.shards += mail.shards;
          });
        };
        _proto.deleteMail = function deleteMail(id, key) {
          var _this23 = this;
          return this.tx(key, function () {
            var mail = _this23.x.mails.find(function (m) {
              return m.id === id;
            });
            _this23.g.require(!!mail && (mail.claimed || mail.expires <= _this23.g.now()), 'error.protected');
            _this23.x.mails = _this23.x.mails.filter(function (m) {
              return m.id !== id;
            });
          });
        };
        _proto.cosmetic = function cosmetic(slot, value, key) {
          var _this24 = this;
          return this.tx(key, function () {
            _this24.g.require(slot >= 0 && slot < 3 && value >= 0 && value < 6, 'error.invalid');
            _this24.g.require(_this24.g.s.maxStage >= value * 50, 'error.locked');
            _this24.x.cosmetics[slot] = value;
          });
        };
        _proto.eventShop = function eventShop(item, key) {
          var _this25 = this;
          return this.tx(key, function () {
            var cost = [50, 100, 75][item];
            _this25.g.require(!!cost, 'error.invalid');
            _this25.g.require(_this25.g.s.eventTokens >= cost);
            _this25.g.s.eventTokens -= cost;
            if (item === 0) _this25.g.s.shards += 5;
            if (item === 1) _this25.g.s.pets[_this25.g.s.activePet] += 3;
            if (item === 2) _this25.g.s.geodes++;
          });
        };
        _proto.alchemy = function alchemy(a, b, key) {
          var _this26 = this;
          return this.tx(key, function () {
            _this26.g.require([a, b].every(function (n) {
              return n >= 0 && n < 4 && Number.isInteger(n);
            }), 'error.invalid');
            _this26.g.require(_this26.g.s.eventTokens >= 30);
            _this26.g.s.eventTokens -= 30;
            var recipe = Math.min(a, b) * 4 + Math.max(a, b);
            if (!_this26.x.recipes.includes(recipe)) _this26.x.recipes.push(recipe);
            if (recipe % 3 === 0) _this26.g.s.shards += 3;else if (recipe % 3 === 1) _this26.g.s.gems += 12;else _this26.g.s.pets[_this26.g.s.activePet]++;
          });
        };
        _proto.drop = function drop(key) {
          var _this27 = this;
          return this.tx(key, function () {
            _this27.g.require(_this27.g.s.eventTokens >= 25);
            _this27.g.s.eventTokens -= 25;
            var path = [];
            var right = 0;
            for (var i = 0; i < 8; i++) {
              var bit = _this27.g.random() < .5 ? 0 : 1;
              path.push(bit);
              right += bit;
            }
            _this27.x.dropHistory = path;
            _this27.g.s.gems += [2, 4, 8, 12, 25, 12, 8, 4, 2][right];
          });
        };
        _proto.tower = function tower(door, key) {
          var _this28 = this;
          return this.tx(key, function () {
            _this28.g.require(door >= 0 && door < 3, 'error.invalid');
            _this28.g.require(_this28.x.towerKeys > 0);
            _this28.x.towerKeys--;
            if (Math.floor(_this28.g.random() * 3) === door) {
              _this28.g.s.gems += 5;
            } else {
              _this28.x.towerFloor++;
              if (_this28.x.towerFloor % 5 === 0) _this28.g.s.shards += 5;
            }
          });
        };
        _createClass(Expansion, [{
          key: "x",
          get: function get() {
            return this.g.s.extra;
          }
        }]);
        return Expansion;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExpansionUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Balance.ts', './Expansion.ts', './Amount.ts', './I18n.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, _createClass, cclegacy, tween, Vec3, GROWTH_STATS, gemstoneSlots, gemstoneBonus, Expansion, display, t;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      GROWTH_STATS = module.GROWTH_STATS;
      gemstoneSlots = module.gemstoneSlots;
      gemstoneBonus = module.gemstoneBonus;
    }, function (module) {
      Expansion = module.Expansion;
    }, function (module) {
      display = module.display;
    }, function (module) {
      t = module.t;
    }],
    execute: function () {
      cclegacy._RF.push({}, "16b62CzHNtFnLErMhK41A9Q", "ExpansionUI", undefined);
      var ExpansionUI = exports('ExpansionUI', /*#__PURE__*/function () {
        function ExpansionUI(a) {
          this.a = a;
        }
        var _proto = ExpansionUI.prototype;
        _proto.tr = function tr(k, v) {
          if (v === void 0) {
            v = {};
          }
          return t(this.g.s.locale, k, v);
        };
        _proto.id = function id(k) {
          return this.a.id(k);
        };
        _proto.action = function action(fn, next) {
          this.a.act(fn, next);
        };
        _proto.list = function list(title, rows, height) {
          if (height === void 0) {
            height = 680;
          }
          var p = this.a.open(this.tr(title), height);
          this.a.scroll(p, 0, -25, 400, height - 120, rows);
          return p;
        };
        _proto.hub = function hub() {
          var _this = this;
          this.list('extra.hub', [['money.store', function () {
            return _this.a.payments.store();
          }], ['money.adPoints', function () {
            return _this.a.payments.ads();
          }], ['balance.title', function () {
            return _this.balance();
          }], ['extra.build', function () {
            return _this.build();
          }], ['extra.talents', function () {
            return _this.talents();
          }], ['extra.perks', function () {
            return _this.perks();
          }], ['extra.petPuzzle', function () {
            return _this.petPuzzle();
          }], ['extra.petMilestones', function () {
            return _this.petMilestones();
          }], ['extra.dustShop', function () {
            return _this.dustShop();
          }], ['extra.crystal', function () {
            return _this.crystal();
          }], ['extra.souls', function () {
            return _this.souls();
          }], ['extra.gems', function () {
            return _this.gems();
          }], ['extra.monuments', function () {
            return _this.monuments();
          }], ['extra.collectibles', function () {
            return _this.collectibles();
          }], ['inbox.title', function () {
            return _this.inbox();
          }], ['extra.cosmetics', function () {
            return _this.cosmetics();
          }], ['extra.notifications', function () {
            return _this.notifications();
          }], ['extra.export', function () {
            return _this.exportSave();
          }], ['complete.serverCards', function () {
            return _this.serverCards();
          }], ['complete.display', function () {
            return _this.displaySettings();
          }], ['complete.support', function () {
            return _this.support();
          }], ['complete.account', function () {
            return _this.account();
          }], ['extra.serviceStatus', function () {
            return _this.serviceStatus();
          }], ['extra.guildTools', function () {
            return _this.guildTools();
          }], ['extra.eventModes', function () {
            return _this.eventHub();
          }], ['extra.limited', function () {
            return _this.limited();
          }]].map(function (_ref) {
            var key = _ref[0],
              fn = _ref[1];
            return {
              title: _this.tr(key),
              action: _this.tr('action.open'),
              click: fn
            };
          }));
        };
        _proto.equipmentDrops = function equipmentDrops() {
          var _this2 = this;
          var items = this.g.s.equipment.filter(function (e) {
            return _this2.x.unseenEquipment.includes(e.id);
          });
          this.list('complete.drops', items.map(function (item) {
            return {
              title: _this2.a.itemName(item),
              sub: _this2.tr('action.level', {
                level: item.level
              }),
              action: _this2.tr('action.details'),
              click: function click() {
                _this2.x.unseenEquipment = _this2.x.unseenEquipment.filter(function (id) {
                  return id !== item.id;
                });
                _this2.g.persist();
                _this2.a.item(item);
              }
            };
          }));
        };
        _proto.tournaments = function tournaments() {
          var _this3 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var boot, history;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this3.a.onlineService.connect(_this3.tr('online.defaultName'));
                case 2:
                  boot = _context.sent;
                  _context.next = 5;
                  return _this3.a.onlineService.request('/competition/history');
                case 5:
                  history = _context.sent;
                  _this3.list('menu.tournament', [{
                    title: _this3.tr('complete.regular'),
                    sub: _this3.tr('complete.regularRule'),
                    action: _this3.tr('action.open'),
                    click: function click() {
                      return _this3.tournament(boot.regular.id, 'regular');
                    }
                  }, {
                    title: _this3.tr('online.abyss'),
                    sub: _this3.tr('online.competitionInfo'),
                    action: _this3.tr('action.open'),
                    click: function click() {
                      return _this3.tournament(boot.tournament.id, 'abyss');
                    }
                  }].concat(history.filter(function (r) {
                    return Date.now() >= r.end;
                  }).map(function (r) {
                    return {
                      title: _this3.tr(r.id < 0 ? 'complete.regular' : 'online.abyss'),
                      sub: _this3.tr('complete.history', {
                        stage: r.score,
                        date: new Date(r.end).toLocaleDateString(_this3.g.s.locale)
                      }),
                      action: _this3.tr(r.claimed ? 'action.claimed' : 'action.claim'),
                      click: function click() {
                        return _this3.tournament(r.id, r.id < 0 ? 'regular' : 'abyss');
                      }
                    };
                  })));
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
        };
        _proto.tournament = function tournament(id, mode) {
          var _this4 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var data, ended, p;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this4.a.onlineService.request('/competition?id=' + id);
                case 2:
                  data = _context3.sent;
                  ended = Date.now() >= data.tournament.end;
                  _this4.a.competitionId = id;
                  p = _this4.a.open(_this4.tr(mode === 'regular' ? 'complete.regular' : 'online.abyss'), 710);
                  _this4.a.label(p, _this4.tr(mode === 'regular' ? 'complete.regularRule' : 'online.competitionInfo'), 0, 231, 375, 125, 16);
                  _this4.a.label(p, _this4.tr('complete.tournamentEnd', {
                    time: new Date(data.tournament.end).toLocaleString(_this4.g.s.locale)
                  }), 0, 144, 375, 45, 14);
                  _this4.a.scroll(p, 0, -60, 400, 335, data.leaderboard.map(function (r, i) {
                    return {
                      title: _this4.tr('online.rank', {
                        rank: i + 1,
                        name: r.name
                      }),
                      sub: _this4.tr('hud.stage', {
                        stage: r.score
                      }),
                      action: _this4.tr('action.details'),
                      click: function click() {
                        return _this4.a.info(r.name, _this4.tr('complete.rankInfo', {
                          rank: i + 1,
                          stage: r.score,
                          reward: Math.max(25, 200 - i * 10)
                        }));
                      }
                    };
                  }));
                  _this4.a.button(p, _this4.tr(ended ? data.claimed ? 'action.claimed' : 'action.claim' : data.state ? 'online.enter' : 'online.join'), 0, -277, 375, 50, function () {
                    void _this4.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                      var reward, result;
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!ended) {
                              _context2.next = 9;
                              break;
                            }
                            _context2.next = 3;
                            return _this4.a.onlineService.command('/competition/claim', {
                              id: id
                            }, "tournament-claim-" + id + "-" + _this4.a.onlineService.accountId);
                          case 3:
                            reward = _context2.sent;
                            _this4.action(function () {
                              return _this4.applyServerReward(reward);
                            }, function () {
                              return _this4.a.toast(_this4.tr('reward.done'));
                            });
                            _this4.a.remoteBusy = false;
                            _this4.tournament(id, mode);
                            _context2.next = 14;
                            break;
                          case 9:
                            _context2.next = 11;
                            return _this4.a.onlineService.command('/competition/join', {
                              mode: mode
                            });
                          case 11:
                            result = _context2.sent;
                            _this4.a.competitionId = result.id;
                            _this4.a.competitionBattle(result.state);
                          case 14:
                          case "end":
                            return _context2.stop();
                        }
                      }, _callee2);
                    })));
                  }, true);
                case 10:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          })));
        };
        _proto.serverCards = function serverCards() {
          var _this5 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            var w, p, cycle, offers;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return _this5.a.onlineService.connect(_this5.tr('online.defaultName'));
                case 2:
                  _context6.next = 4;
                  return _this5.a.onlineService.request('/raid/cards');
                case 4:
                  w = _context6.sent;
                  p = _this5.a.open(_this5.tr('complete.serverCards'), 720);
                  _this5.a.label(p, _this5.tr('complete.serverCardInfo', {
                    dust: w.dust
                  }), 0, 245, 375, 90, 18);
                  cycle = Math.floor(Date.now() / 21600000), offers = [cycle % 18, (cycle + 7) % 18, (cycle + 13) % 18];
                  _this5.a.scroll(p, 0, -70, 400, 460, w.cards.map(function (level, i) {
                    return {
                      title: _this5.tr("card." + i),
                      sub: _this5.tr('raid.card', {
                        level: level,
                        fragments: w.fragments[i]
                      }),
                      action: _this5.tr('action.details'),
                      click: function click() {
                        var box = _this5.a.open(_this5.tr("card." + i), 520);
                        _this5.a.label(box, _this5.tr('complete.cardProc.' + i % 3), 0, 135, 375, 75, 18);
                        _this5.a.button(box, _this5.tr('raid.upgrade', {
                          cost: level * 10
                        }), 0, 30, 375, 50, function () {
                          void _this5.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                              while (1) switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return _this5.a.onlineService.command('/raid/cards/upgrade', {
                                    card: i
                                  });
                                case 2:
                                  _this5.a.remoteBusy = false;
                                  _this5.serverCards();
                                case 4:
                                case "end":
                                  return _context4.stop();
                              }
                            }, _callee4);
                          })));
                        }, true);
                        if (offers.includes(i)) _this5.a.button(box, _this5.tr('extra.dustOffer', {
                          dust: w.dust
                        }), 0, -60, 375, 50, function () {
                          void _this5.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
                            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                              while (1) switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return _this5.a.onlineService.command('/raid/cards/buy', {
                                    card: i
                                  });
                                case 2:
                                  _this5.a.remoteBusy = false;
                                  _this5.serverCards();
                                case 4:
                                case "end":
                                  return _context5.stop();
                              }
                            }, _callee5);
                          })));
                        });
                        _this5.a.button(box, _this5.tr('action.back'), 0, -160, 375, 45, function () {
                          return _this5.serverCards();
                        });
                      }
                    };
                  }));
                case 9:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          })));
        };
        _proto.solo = function solo() {
          var _this6 = this;
          var r = this.g.raid;
          this.list('raid.title', [{
            title: this.tr('raid.portal', {
              portal: this.g.s.portal
            }),
            sub: this.tr('raid.desc'),
            action: this.tr('action.attack'),
            click: function click() {
              if (r && !r.claimed) _this6.a.raidView();else _this6.action(function () {
                return _this6.g.startRaid();
              }, function () {
                return _this6.a.raidView();
              });
            }
          }, {
            title: this.tr('complete.portals'),
            action: this.tr('action.select'),
            click: function click() {
              return _this6.portals();
            }
          }, {
            title: this.tr('complete.presets'),
            action: this.tr('action.open'),
            click: function click() {
              return _this6.presets();
            }
          }, {
            title: this.tr('menu.cards'),
            action: this.tr('action.open'),
            click: function click() {
              return _this6.a.cards();
            }
          }, {
            title: this.tr('complete.dailyPortal'),
            sub: this.tr('complete.dailyPortalInfo', {
              count: this.x.soloCleared.length
            }),
            action: this.tr(this.x.soloRewardDay === this.x.day ? 'action.claimed' : 'action.claim'),
            click: function click() {
              return _this6.action(function () {
                return _this6.e.dailyPortal(_this6.id('solo-daily'));
              }, function () {
                return _this6.solo();
              });
            }
          }]);
        };
        _proto.portals = function portals(page) {
          var _this7 = this;
          if (page === void 0) {
            page = 0;
          }
          var top = Math.min(1000, this.g.s.portal),
            first = page * 20 + 1;
          var rows = Array.from({
            length: Math.min(20, top - first + 1)
          }, function (_, n) {
            var portal = first + n;
            return {
              title: _this7.tr('raid.portal', {
                portal: portal
              }),
              sub: _this7.tr(_this7.x.soloCleared.includes(portal) ? 'extra.collected' : 'complete.portalReplay'),
              action: _this7.tr('action.attack'),
              click: function click() {
                return _this7.action(function () {
                  return _this7.g.startRaid(portal);
                }, function () {
                  return _this7.a.raidView();
                });
              }
            };
          });
          if (page > 0) rows.unshift({
            title: this.tr('action.back'),
            action: '‹',
            click: function click() {
              return _this7.portals(page - 1);
            }
          });
          if (first + 19 < top) rows.push({
            title: this.tr('complete.next'),
            action: '›',
            click: function click() {
              return _this7.portals(page + 1);
            }
          });
          this.list('complete.portals', rows);
        };
        _proto.presets = function presets() {
          var _this8 = this;
          this.list('complete.presets', this.x.deckPresets.map(function (deck, i) {
            return {
              title: _this8.tr('complete.preset', {
                slot: i + 1
              }),
              sub: deck.map(function (c) {
                return _this8.tr("card." + c);
              }).join(' / '),
              action: _this8.tr('action.details'),
              click: function click() {
                var p = _this8.a.open(_this8.tr('complete.preset', {
                  slot: i + 1
                }), 390);
                _this8.a.label(p, deck.map(function (c) {
                  return _this8.tr("card." + c);
                }).join(' / '), 0, 85, 370, 80, 18);
                _this8.a.button(p, _this8.tr('complete.saveDeck'), 0, -5, 370, 50, function () {
                  return _this8.action(function () {
                    return _this8.e.saveDeck(i, _this8.id('deck-save'));
                  }, function () {
                    return _this8.presets();
                  });
                });
                _this8.a.button(p, _this8.tr('action.apply'), 0, -90, 370, 50, function () {
                  return _this8.action(function () {
                    return _this8.e.loadDeck(i, _this8.id('deck-load'));
                  }, function () {
                    return _this8.solo();
                  });
                }, true);
              }
            };
          }));
        };
        _proto.displaySettings = function displaySettings() {
          var _this9 = this;
          this.list('complete.display', ['scientific', 'effects'].map(function (key) {
            return {
              title: _this9.tr('complete.' + key),
              action: _this9.tr(_this9.x[key] ? 'settings.on' : 'settings.off'),
              click: function click() {
                _this9.x[key] = !_this9.x[key];
                _this9.g.persist();
                _this9.a.draw();
                _this9.displaySettings();
              }
            };
          }));
        };
        _proto.support = function support() {
          var _this10 = this;
          var p = this.a.open(this.tr('complete.support'), 550);
          this.a.label(p, this.tr('complete.supportInfo'), 0, 130, 375, 165, 17);
          this.a.button(p, this.tr('extra.export'), 0, -10, 375, 50, function () {
            return _this10.exportSave();
          });
          this.a.button(p, this.tr('complete.import'), 0, -90, 375, 50, function () {
            return _this10.importSave();
          });
          this.a.button(p, this.tr('extra.serviceStatus'), 0, -170, 375, 50, function () {
            return _this10.serviceStatus();
          });
          this.a.button(p, this.tr('complete.restoreBackup'), 0, -233, 375, 44, function () {
            return _this10.restoreBackup();
          });
        };
        _proto.restoreBackup = function restoreBackup() {
          var _this$g$storage,
            _this11 = this;
          var raw = (_this$g$storage = this.g.storage) == null ? void 0 : _this$g$storage.getItem('ember-ascent-before-restore');
          if (!raw) {
            this.a.toast(this.tr('error.locked'));
            return;
          }
          try {
            var state = JSON.parse(raw);
            this.g.migrate(state);
            this.g.validate(state);
            this.a.confirm(this.tr('complete.restoreBackup'), this.tr('complete.replaceSave'), function () {
              return _this11.action(function () {
                return _this11.restore(state);
              }, function () {
                _this11.a.close();
                _this11.a.draw();
              });
            });
          } catch (_unused) {
            this.a.toast(this.tr('error.save'));
          }
        };
        _proto.importSave = function importSave() {
          var _this12 = this;
          if (typeof document === 'undefined') {
            this.a.toast(this.tr('extra.browserOnly'));
            return;
          }
          var input = document.createElement('input');
          input.type = 'file';
          input.accept = '.json,application/json';
          input.onchange = function () {
            var _input$files;
            var file = (_input$files = input.files) == null ? void 0 : _input$files[0];
            if (!file) return;
            if (file.size > 1000000) {
              _this12.a.toast(_this12.tr('error.invalid'));
              return;
            }
            void file.text().then(function (raw) {
              try {
                var state = JSON.parse(raw);
                _this12.g.migrate(state);
                _this12.g.validate(state);
                _this12.a.confirm(_this12.tr('complete.import'), _this12.tr('complete.replaceSave'), function () {
                  return _this12.action(function () {
                    return _this12.restore(state);
                  }, function () {
                    _this12.a.close();
                    _this12.a.draw();
                  });
                });
              } catch (_unused2) {
                _this12.a.toast(_this12.tr('error.save'));
              }
            })["catch"](function () {
              return _this12.a.toast(_this12.tr('error.save'));
            });
          };
          input.click();
        };
        _proto.restore = function restore(state) {
          var before = this.g.s;
          try {
            var _this$g$storage2;
            this.g.migrate(state);
            this.g.validate(state);
            (_this$g$storage2 = this.g.storage) == null || _this$g$storage2.setItem('ember-ascent-before-restore', JSON.stringify(before));
            this.g.s = state;
            this.g.s.lastSeen = this.g.now();
            if (!this.g.persist()) throw Error('error.storage');
            this.g.revision++;
            return true;
          } catch (_unused3) {
            this.g.s = before;
            this.g.notice = 'error.save';
            return false;
          }
        };
        _proto.account = function account() {
          var _this13 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
            var boot, cloud;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return _this13.a.onlineService.connect(_this13.tr('online.defaultName'));
                case 2:
                  boot = _context8.sent;
                  _context8.next = 5;
                  return _this13.a.onlineService.request('/account/save');
                case 5:
                  cloud = _context8.sent;
                  _this13.list('complete.account', [{
                    title: boot.profile.name,
                    sub: _this13.a.onlineService.accountId,
                    action: _this13.tr('complete.rename'),
                    click: function click() {
                      return _this13.renameAccount();
                    }
                  }, {
                    title: _this13.tr('complete.cloudSave'),
                    sub: _this13.tr('complete.cloudInfo', {
                      version: cloud.version
                    }),
                    action: _this13.tr('settings.saveButton'),
                    click: function click() {
                      void _this13.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                          while (1) switch (_context7.prev = _context7.next) {
                            case 0:
                              _context7.next = 2;
                              return _this13.a.onlineService.command('/account/save', {
                                version: cloud.version,
                                state: _this13.g.s
                              });
                            case 2:
                              _this13.a.remoteBusy = false;
                              _this13.account();
                            case 4:
                            case "end":
                              return _context7.stop();
                          }
                        }, _callee7);
                      })));
                    }
                  }, {
                    title: _this13.tr('complete.cloudLoad'),
                    action: _this13.tr('action.apply'),
                    click: function click() {
                      if (!cloud.state) {
                        _this13.a.toast(_this13.tr('error.locked'));
                        return;
                      }
                      _this13.a.confirm(_this13.tr('complete.cloudLoad'), _this13.tr('complete.replaceSave'), function () {
                        return _this13.action(function () {
                          return _this13.restore(cloud.state);
                        }, function () {
                          _this13.a.close();
                          _this13.a.draw();
                        });
                      });
                    }
                  }, {
                    title: _this13.tr('complete.recoveryExport'),
                    sub: _this13.tr('complete.privateKey'),
                    action: _this13.tr('complete.exportFile'),
                    click: function click() {
                      return _this13.downloadRecovery();
                    }
                  }, {
                    title: _this13.tr('complete.recoveryImport'),
                    action: _this13.tr('action.apply'),
                    click: function click() {
                      return _this13.importRecovery();
                    }
                  }]);
                case 7:
                case "end":
                  return _context8.stop();
              }
            }, _callee8);
          })));
        };
        _proto.renameAccount = function renameAccount() {
          var _this14 = this;
          var p = this.a.open(this.tr('complete.rename'), 340),
            field = this.a.edit(p, 0, 35, 370, 48, this.tr('online.defaultName'));
          field.maxLength = 24;
          this.a.button(p, this.tr('action.apply'), 0, -70, 370, 50, function () {
            void _this14.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return _this14.a.onlineService.command('/account/name', {
                      name: field.string
                    });
                  case 2:
                    _this14.a.remoteBusy = false;
                    _this14.account();
                  case 4:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            })));
          }, true);
        };
        _proto.downloadRecovery = function downloadRecovery() {
          if (typeof document === 'undefined') return;
          var o = this.a.onlineService,
            blob = new Blob([JSON.stringify({
              version: 1,
              accountId: o.accountId,
              token: o.token
            })], {
              type: 'application/json'
            }),
            url = URL.createObjectURL(blob),
            link = document.createElement('a');
          link.href = url;
          link.download = 'ember-account-private.json';
          link.click();
          setTimeout(function () {
            return URL.revokeObjectURL(url);
          }, 1000);
        };
        _proto.importRecovery = function importRecovery() {
          var _this15 = this;
          if (typeof document === 'undefined') return;
          var input = document.createElement('input');
          input.type = 'file';
          input.accept = '.json';
          input.onchange = function () {
            var _input$files2;
            var f = (_input$files2 = input.files) == null ? void 0 : _input$files2[0];
            if (!f || f.size > 4096) return;
            void f.text().then(function (raw) {
              var data;
              try {
                data = JSON.parse(raw);
                if (!/^[a-f0-9]{64}$/.test(data.token) || !/^[a-f0-9]{24}$/.test(data.accountId)) throw Error();
              } catch (_unused4) {
                _this15.a.toast(_this15.tr('error.invalid'));
                return;
              }
              _this15.a.confirm(_this15.tr('complete.recoveryImport'), _this15.tr('complete.switchAccount'), function () {
                void _this15.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return _this15.a.onlineService.recover(data.token, data.accountId);
                      case 2:
                        _this15.a.remoteBusy = false;
                        _this15.account();
                      case 4:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                })));
              });
            });
          };
          input.click();
        };
        _proto.balance = function balance() {
          var _this16 = this;
          this.list('balance.title', [{
            title: this.tr('balance.scope'),
            sub: this.tr('balance.scopeInfo')
          }].concat(GROWTH_STATS.flatMap(function (stat) {
            return _this16.g.growthContributions(stat).map(function (row) {
              return {
                title: _this16.tr('balance.stat.' + stat) + ' · ' + _this16.tr('balance.source.' + row.source),
                sub: _this16.tr('balance.factor', {
                  value: _this16.a.format(row.log)
                })
              };
            });
          })));
        };
        _proto.build = function build() {
          var _this17 = this;
          var s = this.g.s;
          this.list('extra.build', Array.from({
            length: 6
          }, function (_, i) {
            return {
              title: _this17.tr("branch." + i),
              sub: _this17.tr('extra.buildRow', {
                levels: s.skills.slice(i * 3, i * 3 + 3).join(' / '),
                damage: _this17.a.format(_this17.g.tapDamage())
              }),
              action: _this17.tr('action.details'),
              click: function click() {
                return _this17.a.skills();
              }
            };
          }));
        };
        _proto.talents = function talents() {
          this.list('extra.talents', [{
            title: this.tr('extra.mastery'),
            sub: this.tr('extra.talentValue', {
              value: this.g.s.weapons.reduce(function (a, b) {
                return a + b;
              }, 0) + this.g.s.scrolls.reduce(function (a, b) {
                return a + b;
              }, 0)
            })
          }, {
            title: this.tr('extra.crafting'),
            sub: this.tr('extra.talentValue', {
              value: this.g.s.crafted
            })
          }, {
            title: this.tr('extra.petMilestones'),
            sub: this.tr('extra.talentValue', {
              value: this.g.s.pets.reduce(function (a, b) {
                return a + b;
              }, 0)
            })
          }, {
            title: this.tr('extra.ascensions'),
            sub: this.tr('extra.talentValue', {
              value: this.x.ascensions.reduce(function (a, b) {
                return a + b;
              }, 0)
            })
          }]);
        };
        _proto.perks = function perks() {
          var _this18 = this;
          this.list('extra.perks', [{
            title: this.tr('money.ad.mega_boost'),
            sub: this.tr('money.adReward.mega_boost'),
            action: this.tr('money.watch'),
            click: function click() {
              return _this18.a.payments.ads('boost');
            }
          }].concat(this.x.perkSlots.map(function (id, slot) {
            return {
              title: _this18.tr('extra.perk', {
                id: id + 1
              }),
              sub: _this18.tr('extra.owned', {
                count: _this18.e.perkCount(id)
              }),
              icon: id,
              action: _this18.tr('action.details'),
              click: function click() {
                return _this18.perk(slot);
              }
            };
          })));
        };
        _proto.perk = function perk(slot) {
          var _this19 = this;
          var id = this.x.perkSlots[slot],
            p = this.a.open(this.tr('extra.perk', {
              id: id + 1
            }), 420);
          this.a.label(p, this.tr('perks.info'), 0, 70, 370, 90, 18);
          this.a.button(p, this.tr('action.apply'), 0, -12, 360, 50, function () {
            return _this19.action(function () {
              return _this19.e.usePerk(slot, _this19.id('perk'));
            }, function () {
              return _this19.perks();
            });
          }, true);
          this.a.button(p, this.tr('extra.replace'), 0, -90, 360, 50, function () {
            return _this19.list('extra.perks', Array.from({
              length: 10
            }, function (_, i) {
              return {
                title: _this19.tr('extra.perk', {
                  id: i + 1
                }),
                sub: _this19.tr('extra.owned', {
                  count: _this19.e.perkCount(i)
                }),
                action: _this19.tr('action.select'),
                click: function click() {
                  return _this19.a.confirm(_this19.tr('extra.replace'), _this19.tr('extra.perkWarning'), function () {
                    return _this19.action(function () {
                      return _this19.e.swapPerk(slot, i, _this19.id('perk-swap'));
                    }, function () {
                      return _this19.perks();
                    });
                  });
                }
              };
            }));
          });
        };
        _proto.hero = function hero(i) {
          var _this20 = this;
          var p = this.a.open(this.tr("hero." + i), 540);
          this.a.label(p, this.tr('extra.heroStats', {
            level: this.g.s.run.heroes[i],
            ascensions: this.x.ascensions[i],
            skills: this.x.heroSkills[i],
            weapons: this.g.s.weapons[i],
            scrolls: this.g.s.scrolls[i]
          }), 0, 110, 375, 160, 19);
          this.a.button(p, this.tr('extra.heroSkill'), 0, -15, 370, 50, function () {
            return _this20.action(function () {
              return _this20.e.heroSkill(i, _this20.id('hero-skill'));
            }, function () {
              return _this20.hero(i);
            });
          }, true);
          this.a.button(p, this.tr('extra.ascend'), 0, -90, 370, 50, function () {
            return _this20.a.confirm(_this20.tr('extra.ascend'), _this20.tr('extra.ascendInfo'), function () {
              return _this20.action(function () {
                return _this20.e.ascend(i, _this20.id('ascend'));
              }, function () {
                return _this20.hero(i);
              });
            });
          });
          this.a.label(p, this.tr('complete.heroSkillInfo', {
            level: [10, 25, 50, 100, 200, 400, 800][this.x.heroSkills[i]] || 800,
            damage: this.a.format(this.g.heroDamage(i))
          }), 0, -184, 370, 80, 14);
        };
        _proto.petDetail = function petDetail(i) {
          var _this21 = this;
          var p = this.a.open(this.tr("pet." + i), 500);
          this.a.label(p, this.tr('complete.petDetail', {
            level: this.g.s.pets[i],
            active: (1 + this.g.s.pets[i] * .025).toFixed(2),
            passive: (1 + this.g.s.pets[i] * .025 * Math.min(1, this.g.s.pets[i] / 100)).toFixed(2)
          }), 0, 115, 375, 120, 18);
          this.a.button(p, this.tr('action.equip'), 0, 10, 375, 50, function () {
            if (!_this21.g.s.pets[i]) _this21.a.toast(_this21.tr('error.locked'));else {
              _this21.g.s.activePet = i;
              _this21.g.persist();
              _this21.a.close();
              _this21.a.drawPanel();
            }
          }, true);
          this.a.button(p, this.tr('extra.petPuzzle'), 0, -65, 375, 50, function () {
            return _this21.petPuzzle();
          });
          this.a.button(p, this.tr('extra.petMilestones'), 0, -140, 375, 50, function () {
            return _this21.petMilestones();
          });
        };
        _proto.petPuzzle = function petPuzzle() {
          var _this22 = this;
          var p = this.a.open(this.tr('extra.petPuzzle'), 660);
          this.a.label(p, this.tr('extra.puzzleInfo', {
            energy: this.x.petEnergy,
            matches: this.x.petMatched.length / 2
          }), 0, 234, 375, 100, 17);
          var _loop = function _loop(i) {
            var visible = _this22.x.petMatched.includes(i) || _this22.x.petFace.includes(i);
            _this22.a.button(p, visible ? String(_this22.x.petBoard[i] + 1) : '?', -147 + i % 4 * 98, 113 - Math.floor(i / 4) * 87, 88, 75, function () {
              return _this22.action(function () {
                return _this22.e.petTile(i, _this22.id('pet-tile'));
              }, function () {
                return _this22.petPuzzle();
              });
            }, visible);
          };
          for (var i = 0; i < 16; i++) {
            _loop(i);
          }
          this.a.label(p, this.tr('extra.puzzleReward'), 0, -253, 375, 58, 16);
        };
        _proto.petMilestones = function petMilestones() {
          var _this23 = this;
          this.list('extra.petMilestones', [10, 25, 50, 100, 250, 500, 1000].map(function (target) {
            return {
              title: _this23.tr('extra.petTarget', {
                target: target
              }),
              action: _this23.tr(_this23.x.petMilestones.includes(target) ? 'action.claimed' : 'action.claim'),
              click: function click() {
                return _this23.action(function () {
                  return _this23.e.petMilestone(target, _this23.id('pet-milestone'));
                }, function () {
                  return _this23.petMilestones();
                });
              }
            };
          }));
        };
        _proto.dustShop = function dustShop() {
          var _this24 = this;
          this.list('extra.dustShop', this.e.dustOffers().map(function (i) {
            return {
              title: _this24.tr("card." + i),
              sub: _this24.tr('extra.dustOffer', {
                dust: _this24.g.s.dust
              }),
              icon: i,
              action: _this24.tr('action.buy'),
              click: function click() {
                return _this24.action(function () {
                  return _this24.e.dustBuy(i, _this24.id('dust'));
                }, function () {
                  return _this24.dustShop();
                });
              }
            };
          }));
        };
        _proto.crystal = function crystal() {
          var _this25 = this;
          this.list('extra.crystal', [0, 1, 2].map(function (slot) {
            return {
              title: _this25.tr('extra.crystalSlot', {
                slot: slot + 1
              }),
              sub: _this25.tr('extra.crystalRule', {
                level: _this25.g.s.cards.reduce(function (a, b) {
                  return a + b;
                }, 0)
              }),
              action: _this25.tr('action.select'),
              click: function click() {
                return _this25.list('extra.crystal', _this25.g.s.cards.map(function (level, i) {
                  return {
                    level: level,
                    i: i
                  };
                }).filter(function (c) {
                  return c.i % 3 === slot;
                }).map(function (c) {
                  return {
                    title: _this25.tr("card." + c.i),
                    sub: _this25.tr('extra.cardBoost', {
                      base: c.level,
                      effective: _this25.e.boostedLevel(c.i)
                    }),
                    action: _this25.tr('action.select'),
                    click: function click() {
                      return _this25.action(function () {
                        return _this25.e.crystal(slot, c.i, _this25.id('crystal'));
                      }, function () {
                        return _this25.crystal();
                      });
                    }
                  };
                }));
              }
            };
          }));
        };
        _proto.souls = function souls() {
          var _this26 = this;
          var p = this.a.open(this.tr('extra.souls'), 720);
          this.a.label(p, this.tr('extra.soulSummary', {
            souls: this.g.s.souls,
            level: Math.floor(this.x.summonCount / 10) + 1,
            points: Math.floor(this.x.summonCount / 5),
            banner: this.x.banner
          }), 0, 255, 380, 76, 17);
          this.a.button(p, this.tr('extra.banner'), -137, 185, 126, 42, function () {
            _this26.x.banner = (_this26.x.banner + 1) % 7;
            _this26.g.persist();
            _this26.souls();
          });
          [1, 10].forEach(function (count, i) {
            return _this26.a.button(p, _this26.tr('extra.summon', {
              count: count
            }), i ? 137 : 0, 185, 126, 42, function () {
              return _this26.summonConfirm(count);
            }, true);
          });
          this.a.button(p, this.tr('extra.levelAll'), -101, 130, 190, 42, function () {
            return _this26.action(function () {
              return _this26.e.levelTitans(Array.from({
                length: 120
              }, function (_, i) {
                return i;
              }), _this26.id('level-all'));
            }, function () {
              return _this26.souls();
            });
          });
          this.a.button(p, this.tr('meta.research'), 101, 130, 190, 42, function () {
            return _this26.a.research();
          });
          this.a.scroll(p, 0, -103, 400, 405, this.g.s.titans.map(function (copies, i) {
            return {
              title: _this26.tr('extra.titan', {
                id: i + 1
              }),
              sub: _this26.tr('extra.titanStats', {
                copies: copies,
                level: _this26.x.titanLevels[i],
                cost: _this26.e.titanCost(i)
              }),
              action: _this26.tr('action.details'),
              click: function click() {
                return _this26.titan(i);
              }
            };
          }));
        };
        _proto.titan = function titan(i) {
          var _this27 = this;
          var p = this.a.open(this.tr('extra.titan', {
            id: i + 1
          }), 420);
          this.a.label(p, this.tr('extra.titanStats', {
            copies: this.g.s.titans[i],
            level: this.x.titanLevels[i],
            cost: this.e.titanCost(i)
          }), 0, 50, 375, 130, 21);
          this.a.button(p, this.tr('action.upgrade'), 0, -112, 370, 50, function () {
            return _this27.action(function () {
              return _this27.e.levelTitans([i], _this27.id('titan'));
            }, function () {
              return _this27.titan(i);
            });
          }, true);
        };
        _proto.gems = function gems() {
          var _this28 = this;
          var p = this.a.open(this.tr('extra.gems'), 700);
          this.a.button(p, this.tr('meta.crack'), -101, 248, 190, 50, function () {
            return _this28.crackResult();
          }, true);
          this.a.button(p, this.tr('extra.mysticResearch'), 101, 248, 190, 50, function () {
            return _this28.mystic();
          });
          this.a.scroll(p, 0, -55, 400, 520, this.g.s.stones.map(function (level, i) {
            return {
              title: _this28.tr('meta.stone', {
                index: i + 1,
                level: level
              }),
              sub: _this28.tr('extra.rarity', {
                rarity: _this28.e.gemstoneRarity(i)
              }),
              icon: i,
              action: _this28.tr('action.details'),
              click: function click() {
                return _this28.gem(i);
              }
            };
          }));
        };
        _proto.gem = function gem(i) {
          var _this29 = this;
          var p = this.a.open(this.tr('meta.stone', {
            index: i + 1,
            level: this.g.s.stones[i]
          }), 660);
          this.a.label(p, this.tr('extra.gemInfo', {
            rarity: this.e.gemstoneRarity(i),
            bonus: gemstoneSlots(this.g.s.stones[i])
          }), 0, 220, 380, 100, 18);
          this.a.scroll(p, 0, -68, 400, 400, [].concat(GROWTH_STATS.map(function (stat) {
            return {
              title: _this29.tr('balance.stat.' + stat),
              sub: _this29.tr('balance.factor', {
                value: _this29.a.format(gemstoneBonus(i, _this29.g.s.stones[i], stat))
              })
            };
          }), [100, 200, 400, 500].map(function (level) {
            return {
              title: _this29.tr('action.level', {
                level: level
              }),
              action: _this29.tr(_this29.x.gemMilestones.includes(i + ":" + level) ? 'action.claimed' : 'action.claim'),
              click: function click() {
                return _this29.action(function () {
                  return _this29.e.gemMilestone(i, level, _this29.id('gem-milestone'));
                }, function () {
                  return _this29.gem(i);
                });
              }
            };
          })));
        };
        _proto.mystic = function mystic() {
          var _this30 = this;
          this.list('extra.mysticResearch', this.x.mysticResearch.map(function (level, i) {
            return {
              title: _this30.tr('meta.researchNode', {
                index: i + 1,
                level: level
              }),
              sub: _this30.tr('extra.researchPoints', {
                points: _this30.x.geodesOpened - _this30.x.mysticResearch.reduce(function (a, l) {
                  return a + l * (l + 1) / 2;
                }, 0)
              }),
              action: _this30.tr('action.upgrade'),
              click: function click() {
                return _this30.action(function () {
                  return _this30.e.mysticNode(i, _this30.id('mystic'));
                }, function () {
                  return _this30.mystic();
                });
              }
            };
          }));
        };
        _proto.monuments = function monuments() {
          var _this31 = this;
          this.list('extra.monuments', [{
            title: this.tr('complete.discoverMonument'),
            sub: this.tr('complete.monumentCost', {
              cost: this.a.format(Math.log10(Math.pow(2, this.g.s.monuments.filter(Boolean).length)))
            }),
            action: this.tr('action.apply'),
            click: function click() {
              var before = _this31.g.s.monuments.slice();
              _this31.action(function () {
                return _this31.e.discoverMonument(_this31.id('monument-discover'));
              }, function () {
                return _this31.monument(_this31.g.s.monuments.findIndex(function (l, i) {
                  return l > before[i];
                }));
              });
            }
          }].concat(this.g.s.monuments.map(function (level, i) {
            return {
              title: _this31.tr('meta.monument', {
                index: i + 1,
                level: level
              }),
              sub: _this31.tr('extra.enchanted', {
                value: _this31.x.monumentEnchanted[i]
              }),
              action: _this31.tr('action.details'),
              click: function click() {
                return _this31.monument(i);
              }
            };
          })));
        };
        _proto.monument = function monument(i) {
          var _this32 = this;
          var p = this.a.open(this.tr('meta.monument', {
            index: i + 1,
            level: this.g.s.monuments[i]
          }), 530);
          this.a.label(p, this.tr('meta.monumentInfo', {
            value: this.a.format(this.g.s.mementos)
          }), 0, 140, 380, 85, 20);
          this.a.button(p, this.tr('action.upgrade'), 0, 50, 375, 50, function () {
            return _this32.action(function () {
              return _this32.g.monument(i, _this32.id('monument'));
            }, function () {
              return _this32.monument(i);
            });
          }, true);
          this.a.button(p, this.tr('artifact.salvage'), 0, -25, 375, 50, function () {
            return _this32.a.confirm(_this32.tr('artifact.salvage'), _this32.tr('extra.monumentRefund'), function () {
              return _this32.action(function () {
                return _this32.e.salvageMonument(i, _this32.id('monument-salvage'));
              }, function () {
                return _this32.monuments();
              });
            });
          });
          this.a.button(p, this.tr('extra.enchantChoices'), 0, -100, 375, 50, function () {
            return _this32.list('extra.enchantChoices', _this32.e.enchantCandidates().map(function (id) {
              return {
                title: _this32.tr('meta.monument', {
                  index: id + 1,
                  level: _this32.g.s.monuments[id]
                }),
                action: _this32.tr('action.apply'),
                click: function click() {
                  return _this32.action(function () {
                    return _this32.e.enchantMonument(id, _this32.id('monument-enchant'));
                  }, function () {
                    return _this32.monuments();
                  });
                }
              };
            }));
          });
          this.a.button(p, this.tr('extra.seasonRewards'), 0, -180, 375, 50, function () {
            return _this32.inbox();
          });
        };
        _proto.collectibles = function collectibles() {
          var _this33 = this;
          this.list('extra.collectibles', [0, 1, 2].map(function (i) {
            return {
              title: _this33.tr("extra.collectible." + i),
              sub: _this33.tr('daily.progress', {
                current: [_this33.x.dailyFairies, _this33.x.dailyEquipment, _this33.x.dailyEggs][i],
                goal: [3, 3, 1][i]
              }),
              action: _this33.tr(_this33.x.collectionClaims.includes(String(i)) ? 'action.claimed' : 'action.claim'),
              click: function click() {
                return _this33.action(function () {
                  return _this33.e.collectible(i, _this33.id('collectible'));
                }, function () {
                  return _this33.collectibles();
                });
              }
            };
          }));
        };
        _proto.inbox = function inbox() {
          var _this34 = this;
          this.list('inbox.title', this.x.mails.map(function (m) {
            return {
              title: _this34.tr(m.title),
              sub: _this34.tr('extra.mailReward', {
                gems: m.gems,
                shards: m.shards
              }),
              action: _this34.tr('action.details'),
              click: function click() {
                var p = _this34.a.open(_this34.tr(m.title), 430);
                _this34.a.label(p, _this34.tr('extra.mailReward', {
                  gems: m.gems,
                  shards: m.shards
                }), 0, 70, 375, 80, 22);
                _this34.a.button(p, _this34.tr(m.claimed ? 'action.claimed' : 'action.claim'), 0, -10, 370, 50, function () {
                  return _this34.action(function () {
                    return _this34.e.claimMail(m.id, _this34.id('mail'));
                  }, function () {
                    return _this34.inbox();
                  });
                }, true);
                _this34.a.button(p, _this34.tr('extra.delete'), 0, -90, 370, 50, function () {
                  return _this34.action(function () {
                    return _this34.e.deleteMail(m.id, _this34.id('delete-mail'));
                  }, function () {
                    return _this34.inbox();
                  });
                });
              }
            };
          }));
        };
        _proto.cosmetics = function cosmetics(slot) {
          var _this35 = this;
          if (slot === void 0) {
            slot = 0;
          }
          var p = this.a.open(this.tr('extra.cosmetics'), 600);
          [0, 1, 2].forEach(function (i) {
            return _this35.a.button(p, _this35.tr("extra.cosmetic." + i), -133 + i * 133, 211, 124, 42, function () {
              return _this35.cosmetics(i);
            }, i === slot);
          });
          this.a.scroll(p, 0, -50, 400, 430, Array.from({
            length: 6
          }, function (_, i) {
            return {
              title: _this35.tr('extra.style', {
                id: i + 1
              }),
              sub: _this35.tr('hero.locked', {
                stage: i * 50
              }),
              icon: i,
              action: _this35.tr(_this35.x.cosmetics[slot] === i ? 'action.selected' : 'action.apply'),
              click: function click() {
                return _this35.action(function () {
                  return _this35.e.cosmetic(slot, i, _this35.id('cosmetic'));
                }, function () {
                  _this35.a.close();
                  _this35.a.draw();
                  _this35.cosmetics(slot);
                });
              }
            };
          }));
        };
        _proto.notifications = function notifications() {
          var _this36 = this;
          this.list('extra.notifications', [0, 1, 5].map(function (i) {
            return {
              title: _this36.tr("extra.notice." + i),
              action: _this36.tr(_this36.x.notifications[i] ? 'settings.on' : 'settings.off'),
              click: function click() {
                _this36.x.notifications[i] = !_this36.x.notifications[i];
                _this36.g.persist();
                if (_this36.x.notifications[i] && typeof Notification !== 'undefined' && Notification.permission === 'default') void Notification.requestPermission();
                _this36.notifications();
              }
            };
          }));
        };
        _proto.exportSave = function exportSave() {
          if (typeof document === 'undefined') {
            this.a.toast(this.tr('extra.browserOnly'));
            return;
          }
          var blob = new Blob([JSON.stringify(this.g.s, null, 2)], {
              type: 'application/json'
            }),
            url = URL.createObjectURL(blob),
            link = document.createElement('a');
          link.href = url;
          link.download = 'ember-ascent-save.json';
          link.click();
          setTimeout(function () {
            return URL.revokeObjectURL(url);
          }, 1000);
          this.a.toast(this.tr('settings.save'));
        };
        _proto.eventHub = function eventHub() {
          var _this37 = this;
          this.list('extra.eventModes', [['complete.eventRules', function () {
            return _this37.a.info(_this37.tr('complete.eventRules'), _this37.tr('complete.eventRulesBody', {
              time: new Date((_this37.x.eventSeason + 1) * 28 * 86400000).toLocaleString(_this37.g.s.locale),
              tokens: _this37.x.eventEarned
            }));
          }], ['extra.eventShop', function () {
            return _this37.eventShop();
          }], ['extra.alchemy', function () {
            return _this37.alchemy();
          }], ['extra.drop', function () {
            return _this37.drop();
          }], ['extra.tower', function () {
            return _this37.tower();
          }], ['event.path', function () {
            return _this37.a.events();
          }], ['extra.seasonRewards', function () {
            return _this37.inbox();
          }], ['extra.globalRaid', function () {
            return _this37.a.globalRaid();
          }], ['extra.eventRanks', function () {
            return _this37.a.eventRanks();
          }]].map(function (_ref12) {
            var key = _ref12[0],
              fn = _ref12[1];
            return {
              title: _this37.tr(key),
              action: _this37.tr('action.open'),
              click: fn
            };
          }));
        };
        _proto.eventShop = function eventShop() {
          var _this38 = this;
          this.list('extra.eventShop', [0, 1, 2].map(function (i) {
            return {
              title: _this38.tr(['extra.eventShards', 'shop.pet', 'meta.crack'][i]),
              sub: _this38.tr('extra.tokenCost', {
                count: [50, 100, 75][i]
              }),
              action: _this38.tr('action.buy'),
              click: function click() {
                return _this38.action(function () {
                  return _this38.e.eventShop(i, _this38.id('event-shop'));
                }, function () {
                  return _this38.eventShop();
                });
              }
            };
          }));
        };
        _proto.alchemy = function alchemy(a, b) {
          var _this39 = this;
          if (a === void 0) {
            a = 0;
          }
          if (b === void 0) {
            b = 0;
          }
          var p = this.a.open(this.tr('extra.alchemy'), 490);
          this.a.label(p, this.tr('extra.alchemyInfo', {
            count: this.x.recipes.length,
            tokens: this.g.s.eventTokens
          }), 0, 135, 375, 100, 18);
          this.a.button(p, this.tr('extra.ingredient', {
            id: a + 1
          }), -99, 30, 184, 75, function () {
            return _this39.alchemy((a + 1) % 4, b);
          });
          this.a.button(p, this.tr('extra.ingredient', {
            id: b + 1
          }), 99, 30, 184, 75, function () {
            return _this39.alchemy(a, (b + 1) % 4);
          });
          this.a.button(p, this.tr('extra.combine'), 0, -100, 375, 50, function () {
            return _this39.action(function () {
              return _this39.e.alchemy(a, b, _this39.id('alchemy'));
            }, function () {
              return _this39.alchemy(a, b);
            });
          }, true);
        };
        _proto.drop = function drop() {
          var _this40 = this;
          var p = this.a.open(this.tr('extra.drop'), 680);
          this.a.label(p, this.tr('extra.tokenCost', {
            count: 25
          }), 0, 250, 375, 40, 19);
          for (var row = 0; row < 8; row++) for (var col = 0; col <= row; col++) this.a.rect(p, (col - row / 2) * 35, 175 - row * 40, 5, 5, '#a3b7bb');
          this.a.button(p, this.tr('extra.dropBall'), 0, -250, 375, 50, function () {
            if (_this40.e.drop(_this40.id('drop'))) {
              var ball = _this40.a.rect(p, 0, 207, 12, 12, '#ecc071');
              var right = 0,
                anim = tween(ball);
              _this40.x.dropHistory.forEach(function (bit, row) {
                right += bit;
                anim = anim.to(.13, {
                  position: new Vec3((right - (row + 1) / 2) * 35, 175 - row * 40, 0)
                });
              });
              anim.call(function () {
                return _this40.a.toast(_this40.tr('reward.done'));
              }).start();
            } else _this40.a.flushNotice();
          }, true);
        };
        _proto.tower = function tower() {
          var _this41 = this;
          var p = this.a.open(this.tr('extra.tower'), 490);
          this.a.label(p, this.tr('extra.towerInfo', {
            floor: this.x.towerFloor,
            keys: this.x.towerKeys
          }), 0, 135, 375, 100, 22);
          var _loop2 = function _loop2(i) {
            _this41.a.button(p, _this41.tr('extra.door', {
              id: i + 1
            }), -132 + i * 132, -5, 120, 150, function () {
              return _this41.action(function () {
                return _this41.e.tower(i, _this41.id('tower'));
              }, function () {
                return _this41.tower();
              });
            }, true);
          };
          for (var i = 0; i < 3; i++) {
            _loop2(i);
          }
        };
        _proto.applyServerReward = function applyServerReward(r) {
          var _this42 = this;
          return this.g.transaction(r.claimId, function () {
            _this42.g.require(!_this42.g.s.claims.includes(r.claimId), 'error.claimed');
            _this42.g.s.claims.push(r.claimId);
            _this42.g.s.gems += r.gems;
            _this42.g.s.shards += r.shards;
          });
        };
        _proto.heroMastery = function heroMastery(scrolls) {
          var _this43 = this;
          if (scrolls === void 0) {
            scrolls = false;
          }
          var levels = scrolls ? this.g.s.scrolls : this.g.s.weapons,
            p = this.a.open(this.tr('hero.mastery'), 700);
          this.a.button(p, this.tr('extra.weapons'), -101, 247, 190, 45, function () {
            return _this43.heroMastery(false);
          }, !scrolls);
          this.a.button(p, this.tr('extra.scrolls'), 101, 247, 190, 45, function () {
            return _this43.heroMastery(true);
          }, scrolls);
          this.a.label(p, this.tr('extra.masterySets', {
            sets: Math.min.apply(Math, levels)
          }), 0, 186, 375, 50, 17);
          this.a.scroll(p, 0, -83, 400, 460, levels.map(function (level, i) {
            return {
              title: _this43.tr("hero." + i),
              sub: _this43.tr('action.level', {
                level: level
              }),
              icon: i,
              action: _this43.tr('action.details'),
              click: function click() {
                return _this43.hero(i);
              }
            };
          }));
        };
        _proto.equipmentSets = function equipmentSets() {
          var _this44 = this;
          var p = this.a.open(this.tr('equipment.sets'), 700);
          this.a.label(p, this.tr('extra.craftPower', {
            spent: this.g.s.crafted,
            power: (1 + this.g.s.crafted * .001).toFixed(2)
          }), 0, 245, 375, 75, 18);
          this.a.scroll(p, 0, -55, 400, 500, Array.from({
            length: Math.max(12, Math.max.apply(Math, [0].concat(this.g.s.setHistory.map(function (p) {
              return Math.floor(p / 5);
            }))) + 2)
          }, function (_, i) {
            return {
              title: _this44.tr('extra.set', {
                id: i + 1
              }),
              sub: _this44.tr('daily.progress', {
                current: _this44.g.s.setHistory.filter(function (part) {
                  return Math.floor(part / 5) === i;
                }).length,
                goal: 5
              }),
              action: _this44.tr('action.details'),
              click: function click() {
                return _this44.equipmentSet(i);
              }
            };
          }));
        };
        _proto.equipmentSet = function equipmentSet(i) {
          var _this45 = this;
          this.list('extra.setDetails', Array.from({
            length: 5
          }, function (_, slot) {
            return {
              title: _this45.tr("slot." + slot),
              sub: _this45.tr(_this45.g.s.setHistory.includes(i * 5 + slot) ? 'extra.collected' : 'extra.missing'),
              icon: slot,
              action: _this45.tr('equipment.craft'),
              click: function click() {
                return _this45.a.confirm(_this45.tr('equipment.craft'), _this45.tr('complete.craftPart', {
                  cost: _this45.g.craftCost(i, slot)
                }), function () {
                  return _this45.action(function () {
                    return _this45.g.craft(_this45.id('craft-part'), i, slot);
                  }, function () {
                    return _this45.equipmentSet(i);
                  });
                });
              }
            };
          }));
        };
        _proto.summonConfirm = function summonConfirm(count) {
          var _this46 = this;
          this.a.confirm(this.tr('extra.summon', {
            count: count
          }), this.tr('extra.summonCost', {
            count: count * 10
          }), function () {
            var before = _this46.g.s.titans.slice();
            _this46.action(function () {
              return _this46.e.summon(count, _this46.x.banner, _this46.id('summon'));
            }, function () {
              return _this46.list('extra.summonResult', _this46.g.s.titans.map(function (value, i) {
                return {
                  value: value - before[i],
                  i: i
                };
              }).filter(function (v) {
                return v.value > 0;
              }).map(function (v) {
                return {
                  title: _this46.tr('extra.titan', {
                    id: v.i + 1
                  }),
                  sub: _this46.tr('extra.owned', {
                    count: v.value
                  }),
                  action: _this46.tr('action.details'),
                  click: function click() {
                    return _this46.titan(v.i);
                  }
                };
              }));
            });
          });
        };
        _proto.crackResult = function crackResult() {
          var _this47 = this;
          var before = this.g.s.stones.slice();
          this.action(function () {
            return _this47.g.crack(_this47.id('geode'));
          }, function () {
            return _this47.gem(_this47.g.s.stones.findIndex(function (value, i) {
              return value > before[i];
            }));
          });
        };
        _proto.notifyReady = function notifyReady() {
          var _this48 = this;
          if (typeof Notification === 'undefined' || Notification.permission !== 'granted' || typeof document === 'undefined' || !document.hidden) return;
          var day = Math.floor(this.g.now() / 86400000);
          var ready = [this.g.now() >= this.g.s.eggAt, !this.g.s.claims.includes('daily.0'), false, false, false, this.x.mails.some(function (m) {
            return !m.claimed && m.expires > _this48.g.now();
          })];
          ready.forEach(function (yes, i) {
            var key = "notice." + day + "." + i;
            if (yes && _this48.x.notifications[i] && !_this48.g.s.claims.includes(key)) {
              new Notification(_this48.tr('game.name'), {
                body: _this48.tr("extra.notice." + i)
              });
              _this48.g.s.claims.push(key);
            }
          });
        };
        _proto.serviceStatus = function serviceStatus() {
          var _this49 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
            var health;
            return _regeneratorRuntime().wrap(function _callee11$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.next = 2;
                  return _this49.a.onlineService.request('/health');
                case 2:
                  health = _context11.sent;
                  _this49.a.info(_this49.tr('extra.serviceStatus'), _this49.tr(health.maintenance ? 'extra.maintenance' : 'extra.serviceReady', {
                    version: health.version || '0.2.0'
                  }));
                case 4:
                case "end":
                  return _context11.stop();
              }
            }, _callee11);
          })));
        };
        _proto.guildBattle = function guildBattle() {
          var _this50 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
            var r;
            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
              while (1) switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.next = 2;
                  return _this50.a.onlineService.request('/guild/raid');
                case 2:
                  r = _context12.sent;
                  if (r) {
                    _context12.next = 7;
                    break;
                  }
                  _context12.next = 6;
                  return _this50.a.onlineService.command('/guild/raid/start', {
                    deck: _this50.g.s.deck
                  });
                case 6:
                  r = _context12.sent;
                case 7:
                  _this50.guildBattlePanel(r);
                case 8:
                case "end":
                  return _context12.stop();
              }
            }, _callee12);
          })));
        };
        _proto.guildBattlePanel = function guildBattlePanel(data) {
          var _this51 = this;
          var p = this.a.open(this.tr('online.guildRaid'), 700),
            r = data.raid,
            start = Date.now(),
            status = this.a.label(p, '', 0, 250, 375, 55, 20);
          var _loop3 = function _loop3(i) {
            _this51.a.button(p, _this51.tr('raid.part', {
              part: i + 1
            }) + '\n' + display(r.hp[i]), i % 2 ? 94 : -94, 160 - Math.floor(i / 2) * 80, 175, 65, function () {
              void _this51.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
                var next;
                return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                  while (1) switch (_context14.prev = _context14.next) {
                    case 0:
                      _context14.next = 2;
                      return _this51.a.onlineService.command('/guild/raid/hit', {
                        id: data.id,
                        part: i
                      });
                    case 2:
                      next = _context14.sent;
                      _this51.guildBattlePanel(next);
                    case 4:
                    case "end":
                      return _context14.stop();
                  }
                }, _callee14);
              })));
            });
          };
          for (var i = 0; i < 8; i++) {
            _loop3(i);
          }
          this.a.label(p, this.tr('extra.guildDeckInfo'), 0, -172, 375, 64, 14);
          this.a.button(p, this.tr('extra.raidSubmit'), 0, -260, 375, 52, function () {
            void _this51.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
              var result;
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return _this51.a.onlineService.command('/guild/raid/finish', {
                      id: data.id
                    }, 'raid-finish-' + data.id);
                  case 2:
                    result = _context13.sent;
                    _this51.a.info(_this51.tr('raid.result'), _this51.tr('extra.raidSummary', {
                      damage: result.damage,
                      hp: result.hp,
                      cards: result.cardDamage.map(function (n) {
                        return display(n);
                      }).join(' / ')
                    }));
                  case 4:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            })));
          }, true);
          this.a.modalRefresh = function () {
            status.string = _this51.tr('raid.damage', {
              damage: display(r.damage),
              seconds: Math.max(0, Math.ceil(r.seconds - (Date.now() - start) / 1000))
            });
          };
          this.a.modalRefresh();
        };
        _proto.guildTools = function guildTools() {
          var _this52 = this;
          this.list('extra.guildTools', [['complete.guildInfo', function () {
            return _this52.guildInfo();
          }], ['extra.guildSearch', function () {
            return _this52.guildSearch();
          }], ['extra.guildEdit', function () {
            return _this52.guildEdit();
          }], ['extra.stickers', function () {
            return _this52.stickers();
          }], ['extra.guildLogs', function () {
            return _this52.guildLogs();
          }], ['extra.guildVault', function () {
            return _this52.vault();
          }], ['extra.retire', function () {
            return _this52.retire();
          }]].map(function (_ref17) {
            var key = _ref17[0],
              fn = _ref17[1];
            return {
              title: _this52.tr(key),
              action: _this52.tr('action.open'),
              click: fn
            };
          }));
        };
        _proto.joinGuild = function joinGuild(id, name) {
          var _this53 = this;
          this.a.confirm(this.tr('online.join'), this.tr('complete.joinGuild', {
            name: name
          }), function () {
            void _this53.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return _this53.a.onlineService.command('/guild/join', {
                      guild: id
                    });
                  case 2:
                    _this53.a.remoteBusy = false;
                    _this53.a.guild();
                  case 4:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15);
            })));
          });
        };
        _proto.guildInfo = function guildInfo() {
          var _this54 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
            var data, info;
            return _regeneratorRuntime().wrap(function _callee16$(_context16) {
              while (1) switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.next = 2;
                  return _this54.a.onlineService.request('/guild');
                case 2:
                  data = _context16.sent;
                  _context16.next = 5;
                  return _this54.a.onlineService.request('/guild/info');
                case 5:
                  info = _context16.sent;
                  _this54.a.info(data.guild.name, _this54.tr('complete.guildInfoBody', {
                    count: data.members.length,
                    description: info.settings.description || _this54.tr('complete.noDescription'),
                    damage: info.vault
                  }));
                case 7:
                case "end":
                  return _context16.stop();
              }
            }, _callee16);
          })));
        };
        _proto.guildSearch = function guildSearch() {
          var _this55 = this;
          var p = this.a.open(this.tr('extra.guildSearch'), 680),
            field = this.a.edit(p, 0, 225, 375, 48, this.tr('online.guildName'));
          this.a.button(p, this.tr('extra.search'), 0, 150, 375, 48, function () {
            var q = field.string;
            void _this55.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
              var rows;
              return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                while (1) switch (_context17.prev = _context17.next) {
                  case 0:
                    _context17.next = 2;
                    return _this55.a.onlineService.connect(_this55.tr('online.defaultName'));
                  case 2:
                    _context17.next = 4;
                    return _this55.a.onlineService.request('/guilds?q=' + encodeURIComponent(q));
                  case 4:
                    rows = _context17.sent;
                    _this55.list('extra.guildSearch', rows.map(function (r) {
                      return {
                        title: r.name,
                        sub: _this55.tr('online.members', {
                          count: r.members
                        }),
                        action: _this55.tr('online.join'),
                        click: function click() {
                          return _this55.joinGuild(r.id, r.name);
                        }
                      };
                    }));
                  case 6:
                  case "end":
                    return _context17.stop();
                }
              }, _callee17);
            })));
          });
        };
        _proto.guildEdit = function guildEdit() {
          var _this56 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
            var data, info, p, name, desc;
            return _regeneratorRuntime().wrap(function _callee19$(_context19) {
              while (1) switch (_context19.prev = _context19.next) {
                case 0:
                  _context19.next = 2;
                  return _this56.a.onlineService.request('/guild');
                case 2:
                  data = _context19.sent;
                  _context19.next = 5;
                  return _this56.a.onlineService.request('/guild/info');
                case 5:
                  info = _context19.sent;
                  p = _this56.a.open(_this56.tr('extra.guildEdit'), 590);
                  name = _this56.a.edit(p, 0, 170, 375, 48, _this56.tr('online.guildName'));
                  desc = _this56.a.edit(p, 0, 60, 375, 70, _this56.tr('extra.description'));
                  name.string = data.guild.name;
                  desc.string = info.settings.description;
                  _this56.a.button(p, _this56.tr('action.apply'), 0, -130, 375, 50, function () {
                    void _this56.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
                      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                        while (1) switch (_context18.prev = _context18.next) {
                          case 0:
                            _context18.next = 2;
                            return _this56.a.onlineService.command('/guild/edit', {
                              name: name.string,
                              description: desc.string,
                              badge: info.settings.badge
                            });
                          case 2:
                            _this56.a.remoteBusy = false;
                            _this56.a.guild();
                          case 4:
                          case "end":
                            return _context18.stop();
                        }
                      }, _callee18);
                    })));
                  }, true);
                case 12:
                case "end":
                  return _context19.stop();
              }
            }, _callee19);
          })));
        };
        _proto.stickers = function stickers() {
          var _this57 = this;
          this.list('extra.stickers', Array.from({
            length: 6
          }, function (_, i) {
            return {
              title: _this57.tr("extra.sticker." + i),
              action: _this57.tr('online.send'),
              click: function click() {
                void _this57.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
                  return _regeneratorRuntime().wrap(function _callee20$(_context20) {
                    while (1) switch (_context20.prev = _context20.next) {
                      case 0:
                        _context20.next = 2;
                        return _this57.a.onlineService.command('/guild/chat', {
                          body: "[sticker:" + i + "]"
                        });
                      case 2:
                        _this57.a.remoteBusy = false;
                        _this57.a.guild();
                      case 4:
                      case "end":
                        return _context20.stop();
                    }
                  }, _callee20);
                })));
              }
            };
          }));
        };
        _proto.guildLogs = function guildLogs() {
          var _this58 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
            var info;
            return _regeneratorRuntime().wrap(function _callee21$(_context21) {
              while (1) switch (_context21.prev = _context21.next) {
                case 0:
                  _context21.next = 2;
                  return _this58.a.onlineService.request('/guild/info');
                case 2:
                  info = _context21.sent;
                  _this58.list('extra.guildLogs', info.logs.map(function (r) {
                    return {
                      title: r.name,
                      sub: _this58.tr('extra.contribution', {
                        value: r.damage
                      })
                    };
                  }));
                case 4:
                case "end":
                  return _context21.stop();
              }
            }, _callee21);
          })));
        };
        _proto.vault = function vault() {
          var _this59 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
            var info, p;
            return _regeneratorRuntime().wrap(function _callee23$(_context23) {
              while (1) switch (_context23.prev = _context23.next) {
                case 0:
                  _context23.next = 2;
                  return _this59.a.onlineService.request('/guild/info');
                case 2:
                  info = _context23.sent;
                  p = _this59.a.open(_this59.tr('extra.guildVault'), 440);
                  _this59.a.label(p, _this59.tr('extra.vaultInfo', {
                    damage: info.vault
                  }), 0, 70, 375, 140, 19);
                  _this59.a.button(p, _this59.tr('action.claim'), 0, -100, 375, 50, function () {
                    void _this59.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
                      var r;
                      return _regeneratorRuntime().wrap(function _callee22$(_context22) {
                        while (1) switch (_context22.prev = _context22.next) {
                          case 0:
                            _context22.next = 2;
                            return _this59.a.onlineService.command('/guild/vault', {}, "vault-" + Math.floor(Date.now() / 43200000) + "-" + _this59.a.onlineService.accountId);
                          case 2:
                            r = _context22.sent;
                            _this59.action(function () {
                              return _this59.applyServerReward(r);
                            }, function () {
                              return _this59.a.close();
                            });
                          case 4:
                          case "end":
                            return _context22.stop();
                        }
                      }, _callee22);
                    })));
                  }, true);
                case 6:
                case "end":
                  return _context23.stop();
              }
            }, _callee23);
          })));
        };
        _proto.retire = function retire() {
          var _this60 = this;
          this.a.confirm(this.tr('extra.retire'), this.tr('extra.retireInfo'), function () {
            void _this60.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
              return _regeneratorRuntime().wrap(function _callee24$(_context24) {
                while (1) switch (_context24.prev = _context24.next) {
                  case 0:
                    _context24.next = 2;
                    return _this60.a.onlineService.command('/guild/retire');
                  case 2:
                    _this60.a.remoteBusy = false;
                    _this60.a.guild();
                  case 4:
                  case "end":
                    return _context24.stop();
                }
              }, _callee24);
            })));
          });
        };
        _proto.member = function member(id) {
          var _this61 = this;
          void this.a.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
            var r, p;
            return _regeneratorRuntime().wrap(function _callee25$(_context25) {
              while (1) switch (_context25.prev = _context25.next) {
                case 0:
                  _context25.next = 2;
                  return _this61.a.onlineService.request('/guild/member?id=' + encodeURIComponent(id));
                case 2:
                  r = _context25.sent;
                  p = _this61.a.open(r.name, 420);
                  _this61.a.label(p, _this61.tr('extra.contribution', {
                    value: r.damage
                  }), 0, 50, 375, 90, 22);
                  _this61.a.label(p, _this61.tr(r.role === 'leader' ? 'online.leader' : 'online.member'), 0, -50, 375, 50, 20);
                case 6:
                case "end":
                  return _context25.stop();
              }
            }, _callee25);
          })));
        };
        _proto.limited = function limited() {
          var _this62 = this;
          var day = Math.floor(this.g.now() / 86400000);
          this.list('extra.limited', [{
            title: this.tr('extra.limitedOffer'),
            sub: this.tr('extra.limitedInfo'),
            action: this.tr(this.g.s.claims.includes('daily.limited') ? 'action.claimed' : 'action.buy'),
            click: function click() {
              return _this62.action(function () {
                return _this62.g.transaction("limited-" + day, function () {
                  _this62.g.require(!_this62.g.s.claims.includes('daily.limited'), 'error.claimed');
                  _this62.g.require(_this62.g.s.gems >= 100);
                  _this62.g.s.claims.push('daily.limited');
                  _this62.g.s.gems -= 100;
                  _this62.g.s.shards += 20;
                  _this62.e.fortune(10);
                });
              }, function () {
                return _this62.limited();
              });
            }
          }]);
        };
        _createClass(ExpansionUI, [{
          key: "g",
          get: function get() {
            return this.a.game;
          }
        }, {
          key: "e",
          get: function get() {
            return new Expansion(this.g);
          }
        }, {
          key: "x",
          get: function get() {
            return this.g.s.extra;
          }
        }]);
        return ExpansionUI;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Game.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Balance.ts', './Amount.ts', './Expansion.ts', './Config.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, gemstoneBonus, routedBonus, ARTIFACT_DISCOVERY_COSTS, ZERO, amount, add, mul, sub, newExpansion, Expansion, CONFIG, HEROES, SPELLS, SKILLS;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      gemstoneBonus = module.gemstoneBonus;
      routedBonus = module.routedBonus;
      ARTIFACT_DISCOVERY_COSTS = module.ARTIFACT_DISCOVERY_COSTS;
    }, function (module) {
      ZERO = module.ZERO;
      amount = module.amount;
      add = module.add;
      mul = module.mul;
      sub = module.sub;
    }, function (module) {
      newExpansion = module.newExpansion;
      Expansion = module.Expansion;
    }, function (module) {
      CONFIG = module.CONFIG;
      HEROES = module.HEROES;
      SPELLS = module.SPELLS;
      SKILLS = module.SKILLS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "31d28TvXSNPbZwhJGQ7Cf5M", "Game", undefined);
      var Game = exports('Game', /*#__PURE__*/function () {
        function Game(storage, now) {
          if (now === void 0) {
            now = function now() {
              return Date.now();
            };
          }
          this.s = void 0;
          this.notice = '';
          this.revision = 0;
          this.saveError = false;
          this.storage = storage;
          this.now = now;
          this.s = this.fresh();
          var raw = storage == null ? void 0 : storage.getItem('ember-ascent-v1');
          if (raw) {
            try {
              var parsed = JSON.parse(raw);
              this.migrate(parsed);
              this.validate(parsed);
              this.s = parsed;
            } catch (_unused) {
              this.notice = 'error.save';
              try {
                storage == null || storage.setItem('ember-ascent-corrupt-' + this.now(), raw);
              } catch (_unused2) {
                this.saveError = true;
              }
            }
          }
          var elapsed = Math.min(CONFIG.maxOfflineSeconds, Math.max(0, (this.now() - this.s.lastSeen) / 1000));
          if (elapsed > 60 && this.dps() > ZERO) this.s.offline = add(this.s.offline, mul(this.goldReward(), elapsed * 0.15));
          if (this.raid && !this.raid.ended) {
            this.raid.seconds = Math.max(0, this.raid.seconds - elapsed);
            this.raid.ended = this.raid.seconds <= 0;
          }
          this.s.lastSeen = this.now();
          this.dailyReset();
          new Expansion(this).sync();
          this.persist();
        }
        var _proto = Game.prototype;
        _proto.fresh = function fresh() {
          var now = this.now();
          return {
            extra: newExpansion(now),
            fairyAt: now,
            version: 1,
            created: now,
            lastSeen: now,
            locale: 'ko',
            run: this.newRun(),
            maxStage: 1,
            spellSlots: [0, 1, 2, 3, 4, 5],
            artifactInvested: Array(30).fill(ZERO),
            salvaged: [],
            enchanted: Array(30).fill(0),
            achievements: Array(4).fill(0),
            appearance: Array(5).fill(-1),
            prestiges: 0,
            gems: 100,
            relics: ZERO,
            shards: 15,
            sp: 0,
            spMilestone: 0,
            skills: Array(18).fill(0),
            artifacts: Array(30).fill(0),
            pets: Array(12).fill(0),
            activePet: 0,
            eggAt: now,
            equipment: [],
            equipped: Array(5).fill(-1),
            nextItem: 1,
            setHistory: [],
            crafted: 0,
            totalKills: 0,
            totalTaps: 0,
            day: Math.floor(now / 86400000),
            dayKills: 0,
            dayTaps: 0,
            dayPrestiges: 0,
            claims: [],
            dust: 0,
            cards: Array(18).fill(1),
            fragments: Array(18).fill(0),
            deck: [0, 1, 2],
            portal: 1,
            souls: 0,
            titans: Array(120).fill(0),
            research: Array(12).fill(0),
            geodes: 0,
            stones: Array(24).fill(0),
            mementos: ZERO,
            monuments: Array(12).fill(0),
            eventTokens: 0,
            board: Array(16).fill(0),
            perks: Array(6).fill(2),
            perkUntil: Array(6).fill(0),
            weapons: Array(24).fill(0),
            scrolls: Array(24).fill(0),
            transactions: [],
            rng: now >>> 0 || 12345678,
            offline: ZERO,
            audio: true
          };
        };
        _proto.newRun = function newRun(stage) {
          if (stage === void 0) {
            stage = 1;
          }
          return {
            stage: stage,
            kills: 0,
            boss: false,
            bossLeft: 30,
            bossFailed: false,
            hp: this.maxHP(stage, false),
            gold: amount(25),
            master: 1,
            heroes: Array(24).fill(0),
            mana: 120,
            spells: Array(10).fill(0),
            cooldowns: Array(10).fill(0),
            spellLevels: Array(10).fill(1),
            stacks: Array(10).fill(0),
            elapsed: 0
          };
        };
        _proto.migrate = function migrate(s) {
          var defaults = this.fresh();
          if (!s.extra) {
            s.extra = defaults.extra;
            s.extra.summonCount = s.titans.reduce(function (a, b) {
              return a + b;
            }, 0);
          }
          if (s.extra.unlocked === undefined) s.extra.unlocked = [8, 15, 60, 100, 1000, 100000, 180000].filter(function (stage) {
            return s.maxStage >= stage;
          });
          if (s.extra.lastEquipmentStage === undefined) s.extra.lastEquipmentStage = Math.floor(s.maxStage / 5) * 5;
          for (var _i = 0, _Object$keys = Object.keys(defaults.extra); _i < _Object$keys.length; _i++) {
            var _key = _Object$keys[_i];
            if (!(_key in s.extra)) s.extra[_key] = defaults.extra[_key];
          }
          if (s.extra.soloRaid && !s.extra.soloRaid.expiresAt) s.extra.soloRaid.expiresAt = s.lastSeen + s.extra.soloRaid.seconds * 1000;
          for (var _iterator = _createForOfIteratorHelperLoose(['fairyAt', 'spellSlots', 'artifactInvested', 'salvaged', 'enchanted', 'achievements', 'appearance']), _step; !(_step = _iterator()).done;) {
            var _key2 = _step.value;
            if (!(_key2 in s)) s[_key2] = defaults[_key2];
          }
          if (s.run) {
            var _s$run$spells, _s$run$cooldowns;
            if (!s.run.spellLevels) s.run.spellLevels = Array(10).fill(1);
            if (!s.run.stacks) s.run.stacks = Array(10).fill(0);
            if (((_s$run$spells = s.run.spells) == null ? void 0 : _s$run$spells.length) === 6) s.run.spells.push(0, 0, 0, 0);
            if (((_s$run$cooldowns = s.run.cooldowns) == null ? void 0 : _s$run$cooldowns.length) === 6) s.run.cooldowns.push(0, 0, 0, 0);
          }
        };
        _proto.validate = function validate(s) {
          if (!s || s.version !== 1 || !s.run || !['ko', 'en'].includes(s.locale)) throw Error('schema');
          for (var _i2 = 0, _Object$entries = Object.entries({
              spellSlots: 6,
              artifactInvested: 30,
              enchanted: 30,
              achievements: 4,
              appearance: 5,
              skills: 18,
              artifacts: 30,
              pets: 12,
              equipped: 5,
              cards: 18,
              fragments: 18,
              deck: 3,
              titans: 120,
              research: 12,
              stones: 24,
              monuments: 12,
              board: 16,
              perks: 6,
              perkUntil: 6,
              weapons: 24,
              scrolls: 24
            }); _i2 < _Object$entries.length; _i2++) {
            var _Object$entries$_i = _Object$entries[_i2],
              _key3 = _Object$entries$_i[0],
              length = _Object$entries$_i[1];
            var a = s[_key3];
            if (!Array.isArray(a) || a.length !== length || a.some(function (v) {
              return typeof v !== 'number' || !Number.isFinite(v);
            })) throw Error(_key3);
          }
          for (var _i3 = 0, _Object$entries2 = Object.entries({
              perkSlots: 6,
              extraPerks: 4,
              ascensions: 24,
              heroSkills: 24,
              petBoard: 16,
              monumentInvested: 12,
              monumentEnchanted: 12,
              crystal: 3,
              titanLevels: 120,
              mysticResearch: 12,
              cosmetics: 3,
              notifications: 6
            }); _i3 < _Object$entries2.length; _i3++) {
            var _Object$entries2$_i = _Object$entries2[_i3],
              _key4 = _Object$entries2$_i[0],
              _length = _Object$entries2$_i[1];
            if (!Array.isArray(s.extra[_key4]) || s.extra[_key4].length !== _length) throw Error('extra.' + _key4);
          }
          var validDeck = function validDeck(d) {
            return Array.isArray(d) && d.length === 3 && new Set(d).size === 3 && d.every(function (n) {
              return Number.isInteger(n) && n >= 0 && n < 18;
            });
          };
          if (!validDeck(s.deck) || !Array.isArray(s.extra.deckPresets) || s.extra.deckPresets.length !== 3 || !s.extra.deckPresets.every(validDeck)) throw Error('deck');
          if (!Array.isArray(s.extra.rewardNotices) || s.extra.rewardNotices.some(function (r) {
            return !['milestone', 'weapon', 'scroll', 'weaponSet', 'equipmentSet'].includes(r.kind) || !Number.isInteger(r.value) || r.value < 0 || !Number.isInteger(r.count) || r.count < 1;
          })) throw Error('rewardNotices');
          var raid = s.extra.soloRaid;
          if (raid && (!validDeck(raid.deck) || !Number.isInteger(raid.portal) || raid.portal < 1 || raid.portal > 1000 || raid.hp.length !== 8 || raid.armor.length !== 8 || raid.cardDamage.length !== 3 || raid.seconds < 0 || raid.seconds > 30)) throw Error('raid');
          var scan = function scan(o) {
            for (var _i4 = 0, _Object$values = Object.values(o); _i4 < _Object$values.length; _i4++) {
              var v = _Object$values[_i4];
              if (typeof v === 'number' && !Number.isFinite(v)) throw Error('number');
              if (v && typeof v === 'object') scan(v);
            }
          };
          scan(s);
          if (s.run.stage < 1 || s.run.stage > 1000000 || s.run.master < 1 || s.gems < 0 || s.shards < 0 || !Array.isArray(s.transactions) || !Array.isArray(s.equipment)) throw Error('range');
          if (s.run.heroes.length !== 24 || s.run.spells.length !== 10 || s.run.cooldowns.length !== 10 || s.run.spellLevels.length !== 10 || s.run.stacks.length !== 10) throw Error('run');
        };
        _proto.persist = function persist() {
          if (!this.storage) return true;
          try {
            this.storage.setItem('ember-ascent-v1', JSON.stringify(this.s));
            this.saveError = false;
            return true;
          } catch (_unused3) {
            this.saveError = true;
            this.notice = 'error.storage';
            return false;
          }
        };
        _proto.transaction = function transaction(id, action) {
          if (this.s.transactions.includes(id)) return false;
          var before = JSON.stringify(this.s);
          try {
            action();
            this.s.transactions.push(id);
            this.s.transactions = this.s.transactions.slice(-512);
            this.validate(this.s);
            if (!this.persist()) throw Error('error.storage');
            this.revision++;
            return true;
          } catch (e) {
            this.s = JSON.parse(before);
            this.notice = e.message.startsWith('error.') ? e.message : 'error.invalid';
            return false;
          }
        };
        _proto.require = function require(v, key) {
          if (key === void 0) {
            key = 'error.currency';
          }
          if (!v) throw Error(key);
        };
        _proto.random = function random() {
          var x = this.s.rng;
          x ^= x << 13;
          x ^= x >>> 17;
          x ^= x << 5;
          this.s.rng = x >>> 0;
          return this.s.rng / 4294967296;
        };
        _proto.maxHP = function maxHP(stage, boss) {
          if (stage === void 0) {
            stage = this.s.run.stage;
          }
          if (boss === void 0) {
            boss = this.s.run.boss;
          }
          return Math.log10(CONFIG.stageBaseHP) + (stage - 1) * Math.log10(CONFIG.stageGrowth) + (boss ? Math.log10(CONFIG.bossMultiplier) : 0);
        };
        _proto.bonus = function bonus(kind) {
          var _this = this;
          var b = kind !== 3 && this.s.extra.commerce.boostUntil > this.now() ? Math.log10(2) : 0;
          if ((kind === 3 ? this.s.extra.commerce.goldSpreeUntil : this.s.extra.commerce.damageSpreeUntil) > this.now()) b += 1;
          this.s.artifacts.forEach(function (l, i) {
            if (i % 4 === kind || i % 4 === 0) b += Math.log10(1 + l * 0.22) + (_this.s.enchanted[i] ? 1 : 0);
          });
          this.s.pets.forEach(function (l, i) {
            if (i % 3 === kind % 3) b += Math.log10(1 + l * .025 * (i === _this.s.activePet ? 1 : Math.min(1, l / 100)));
          });
          this.s.equipped.forEach(function (id) {
            var e = _this.s.equipment.find(function (e) {
              return e.id === id;
            });
            if (e) b += Math.log10(e.power);
          });
          b += this.s.skills.filter(function (_, i) {
            return Math.floor(i / 3) % 3 === kind % 3;
          }).reduce(function (a, l) {
            return a + l * .06;
          }, 0);
          b += Math.log10(1 + this.s.extra.summonCount * .02);
          b += this.growthContributions(kind === 3 ? 'gold' : kind === 2 ? 'hero' : 'tap').reduce(function (sum, row) {
            return sum + row.log;
          }, 0);
          b += Math.log10(1 + this.s.crafted * .001);
          if (this.s.setHistory.length >= 5) b += Array.from(new Set(this.s.setHistory.map(function (p) {
            return Math.floor(p / 5);
          }))).filter(function (set) {
            return [0, 1, 2, 3, 4].every(function (slot) {
              return _this.s.setHistory.includes(set * 5 + slot);
            });
          }).length * .2;
          if (this.s.extra.perkSlots.some(function (id, slot) {
            return (id % 4 === 0 || id % 4 === kind % 4) && _this.s.perkUntil[slot] > _this.now();
          })) b += Math.log10(2);
          return b;
        };
        _proto.growthContributions = function growthContributions(stat) {
          return [{
            source: 'stones',
            log: this.s.stones.reduce(function (sum, level, id) {
              return sum + gemstoneBonus(id, level, stat);
            }, 0)
          }, {
            source: 'monuments',
            log: routedBonus(this.s.monuments, stat, .2, true) + routedBonus(this.s.extra.monumentEnchanted, stat, 1)
          }, {
            source: 'titans',
            log: routedBonus(this.s.extra.titanLevels, stat, .03, true)
          }, {
            source: 'mystic',
            log: routedBonus(this.s.extra.mysticResearch, stat, .02)
          }, {
            source: 'research',
            log: routedBonus(this.s.research, stat, .015)
          }];
        };
        _proto.tapDamage = function tapDamage() {
          return amount(4) + this.s.run.master * .055 + this.bonus(1) + this.spellBonus(3, 10) + this.spellBonus(7, 3);
        };
        _proto.heroDamage = function heroDamage(i) {
          var l = this.s.run.heroes[i];
          return l ? amount(HEROES[i].damage) + Math.log10(l) + Math.floor(l / 25) * Math.log10(2) + this.bonus(2) + this.s.extra.ascensions[i] * 16 + this.s.extra.heroSkills[i] * Math.log10(1.5) + Math.log10(1 + this.s.weapons[i] + this.s.scrolls[i] * .5) : ZERO;
        };
        _proto.dps = function dps() {
          var _this2 = this;
          var result = this.s.run.heroes.reduce(function (sum, _, i) {
            return add(sum, _this2.heroDamage(i));
          }, ZERO);
          if (this.s.run.spells[4] > 0) result += this.spellBonus(4, 5);
          if (this.s.run.spells[6] > 0) result = add(result, mul(this.tapDamage(), 6));
          if (this.s.run.spells[8] > 0) result = add(result, mul(this.tapDamage(), 8));
          if (this.s.run.spells[5] > 0) result = add(result, mul(this.tapDamage(), 12));
          return result;
        };
        _proto.goldReward = function goldReward() {
          return amount(CONFIG.goldBase) + (this.s.run.stage - 1) * Math.log10(CONFIG.stageGrowth) + this.bonus(3) + (this.s.run.boss ? Math.log10(5) : 0) + this.spellBonus(2, 10) + this.spellBonus(9, 3);
        };
        _proto.tick = function tick(dt) {
          if (!Number.isFinite(dt) || dt <= 0) return;
          dt = Math.min(dt, 1);
          var r = this.s.run;
          r.elapsed += dt;
          r.mana = Math.min(CONFIG.manaMax, r.mana + CONFIG.manaRegen * dt);
          for (var i = 0; i < 10; i++) {
            r.spells[i] = Math.max(0, r.spells[i] - dt);
            r.cooldowns[i] = Math.max(0, r.cooldowns[i] - dt);
            if (r.spells[i] === 0) r.stacks[i] = 0;
          }
          if (r.boss) {
            r.bossLeft -= dt;
            if (r.bossLeft <= 0) {
              r.boss = false;
              r.bossFailed = true;
              r.hp = this.maxHP();
              this.notice = 'battle.failed';
              this.revision++;
            }
          }
          this.damage(mul(this.dps(), dt));
          if (this.raid && !this.raid.ended) {
            this.raid.seconds = Math.max(0, Math.min(this.raid.seconds - dt, (this.raid.expiresAt - this.now()) / 1000));
            if (this.raid.seconds <= 0) this.raid.ended = true;
          }
          this.s.lastSeen = this.now();
          this.dailyReset();
          new Expansion(this).sync();
        };
        _proto.tap = function tap() {
          this.s.totalTaps++;
          this.s.dayTaps++;
          var crit = this.random() < (this.s.run.spells[1] > 0 ? .7 : .06);
          var damage = mul(this.tapDamage(), crit ? 5 : 1);
          this.damage(damage);
          return damage;
        };
        _proto.damage = function damage(value) {
          if (value === ZERO) return;
          var r = this.s.run;
          if (value < r.hp - 1e-10) {
            r.hp = sub(r.hp, value);
            return;
          }
          r.gold = add(r.gold, this.goldReward());
          this.s.totalKills++;
          this.s.extra.eventEarned++;
          this.s.dayKills++;
          this.s.eventTokens++;
          if (r.boss) {
            r.stage++;
            r.kills = 0;
            r.boss = false;
            r.bossFailed = false;
            this.s.maxStage = Math.max(this.s.maxStage, r.stage);
            this.unlock();
          } else {
            r.kills = Math.min(CONFIG.titansPerStage, r.kills + 1);
            if (r.kills >= CONFIG.titansPerStage && !r.bossFailed) {
              r.boss = true;
              r.bossLeft = CONFIG.bossSeconds;
            }
          }
          r.hp = this.maxHP();
          this.revision++;
        };
        _proto.unlock = function unlock() {
          var s = this.s;
          for (var _i5 = 0, _arr = [8, 15, 60, 100, 1000, 100000, 180000]; _i5 < _arr.length; _i5++) {
            var stage = _arr[_i5];
            if (s.maxStage >= stage && !s.extra.unlocked.includes(stage)) {
              s.extra.unlocked.push(stage);
              s.extra.unlockNotices.push(stage);
            }
          }
          if (s.maxStage >= 8 && !s.pets.some(Boolean)) {
            s.pets[0] = 1;
            this.notice = 'unlock.pet';
          }
          if (s.maxStage >= 15 && s.maxStage % 5 === 0 && s.maxStage > s.extra.lastEquipmentStage && s.equipment.length < CONFIG.inventoryCap) {
            this.drop();
            s.extra.lastEquipmentStage = s.maxStage;
          }
          var milestone = Math.floor(s.maxStage / 50);
          if (milestone > s.spMilestone) {
            this.rewardNotice('milestone', s.maxStage, milestone - s.spMilestone);
            s.sp += milestone - s.spMilestone;
            s.spMilestone = milestone;
          }
        };
        _proto.toggleBoss = function toggleBoss() {
          var r = this.s.run;
          if (r.boss) {
            r.boss = false;
            r.bossFailed = true;
          } else if (r.kills >= CONFIG.titansPerStage) {
            r.boss = true;
            r.bossFailed = false;
            r.bossLeft = 30;
          }
          r.hp = this.maxHP();
          this.revision++;
        };
        _proto.upgradeCost = function upgradeCost(hero, count) {
          if (count === void 0) {
            count = 1;
          }
          var level = hero < 0 ? this.s.run.master : this.s.run.heroes[hero];
          var growth = hero < 0 ? 1.072 : 1.075;
          var base = hero < 0 ? 4 : HEROES[hero].cost;
          return (this.s.extra.commerce.discountUntil > this.now() ? -1 : 0) + amount(base) + level * Math.log10(growth) + Math.log10((Math.pow(growth, count) - 1) / (growth - 1));
        };
        _proto.buy = function buy(hero, requested) {
          if (hero >= 0 && this.s.maxStage < HEROES[hero].unlock) {
            this.notice = 'error.locked';
            return false;
          }
          var count = requested;
          if (count === -1) {
            count = 0;
            while (count < 1000 && this.upgradeCost(hero, count + 1) <= this.s.run.gold + 1e-10) count++;
          }
          if (count <= 0 || this.upgradeCost(hero, count) > this.s.run.gold + 1e-10) {
            this.notice = 'error.currency';
            return false;
          }
          this.s.run.gold = sub(this.s.run.gold, this.upgradeCost(hero, count));
          if (hero < 0) this.s.run.master += count;else this.s.run.heroes[hero] += count;
          this.revision++;
          return true;
        };
        _proto.spellBonus = function spellBonus(i, base) {
          return this.s.run.spells[i] > 0 ? Math.log10(base * (1 + (this.s.run.spellLevels[i] - 1) * .15) * Math.max(1, this.s.run.stacks[i])) : 0;
        };
        _proto.cast = function cast(i) {
          var r = this.s.run,
            c = SPELLS[i];
          if (!c || r.master < c.unlock) {
            this.notice = 'error.locked';
            return false;
          }
          var multicast = r.spells[i] > 0 && r.master >= 500 && r.stacks[i] < 3;
          var cost = c.mana * (multicast ? r.stacks[i] + 1 : 1);
          if (r.mana < cost || r.cooldowns[i] > 0 && !multicast) {
            this.notice = 'error.mana';
            return false;
          }
          r.mana -= cost;
          r.cooldowns[i] = c.cooldown;
          r.spells[i] = c.duration;
          r.stacks[i] = multicast ? r.stacks[i] + 1 : 1;
          if (i === 0) this.damage(mul(this.tapDamage(), 100 * r.spellLevels[i]));
          this.revision++;
          return true;
        };
        _proto.upgradeSpell = function upgradeSpell(i) {
          var r = this.s.run,
            cost = amount(100) + r.spellLevels[i] * Math.log10(2);
          if (r.master < SPELLS[i].unlock) {
            this.notice = 'error.locked';
            return false;
          }
          if (r.gold < cost) {
            this.notice = 'error.currency';
            return false;
          }
          r.gold = sub(r.gold, cost);
          r.spellLevels[i]++;
          this.persist();
          this.revision++;
          return true;
        };
        _proto.selectSpell = function selectSpell(slot, i) {
          if (this.s.spellSlots.includes(i)) {
            this.notice = 'error.invalid';
            return false;
          }
          var old = this.s.spellSlots[slot];
          this.s.run.spells[old] = 0;
          this.s.run.stacks[old] = 0;
          this.s.spellSlots[slot] = i;
          this.persist();
          this.revision++;
          return true;
        };
        _proto.prestigeReward = function prestigeReward() {
          return this.s.run.stage < 60 ? ZERO : amount(Math.max(1, Math.floor(Math.pow(this.s.run.stage / 60, 2.1))));
        };
        _proto.prestige = function prestige(id) {
          var _this3 = this;
          return this.transaction(id, function () {
            _this3.require(_this3.s.run.stage >= 60, 'error.locked');
            _this3.s.relics = add(_this3.s.relics, _this3.prestigeReward());
            _this3.s.prestiges++;
            _this3.s.dayPrestiges++;
            _this3.s.extra.towerKeys += 3;
            _this3.s.extra.ascensions.fill(0);
            _this3.s.extra.heroSkills.fill(0);
            if (_this3.s.maxStage >= 100000) _this3.s.souls += 100;
            if (_this3.s.maxStage >= 180000) _this3.s.mementos = add(_this3.s.mementos, amount(10));
            _this3.s.run = _this3.newRun(Math.max(1, Math.floor(_this3.s.maxStage * .05)));
          });
        };
        _proto.discoverCost = function discoverCost() {
          var discovered = this.s.artifacts.filter(Boolean).length + this.s.salvaged.length;
          return amount(ARTIFACT_DISCOVERY_COSTS[Math.min(discovered, ARTIFACT_DISCOVERY_COSTS.length - 1)]);
        };
        _proto.discover = function discover(id) {
          var _this4 = this;
          return this.transaction(id, function () {
            var c = _this4.discoverCost(),
              options = _this4.s.artifacts.map(function (l, i) {
                return l === 0 && !_this4.s.salvaged.includes(i) ? i : -1;
              }).filter(function (i) {
                return i >= 0;
              });
            _this4.require(options.length > 0, 'error.complete');
            _this4.require(_this4.s.relics >= c);
            _this4.s.relics = sub(_this4.s.relics, c);
            _this4.s.artifacts[options[Math.floor(_this4.random() * options.length)]] = 1;
          });
        };
        _proto.artifactCost = function artifactCost(i) {
          return amount(Math.pow(this.s.artifacts[i] + 1, 1.4));
        };
        _proto.upgradeArtifact = function upgradeArtifact(i, id) {
          var _this5 = this;
          return this.transaction(id, function () {
            _this5.require(_this5.s.artifacts[i] > 0, 'error.locked');
            var c = _this5.artifactCost(i);
            _this5.require(_this5.s.relics >= c);
            _this5.s.relics = sub(_this5.s.relics, c);
            _this5.s.artifacts[i]++;
            _this5.s.artifactInvested[i] = add(_this5.s.artifactInvested[i], c);
          });
        };
        _proto.salvageArtifact = function salvageArtifact(i, id) {
          var _this6 = this;
          return this.transaction(id, function () {
            _this6.require(_this6.s.artifacts[i] > 0 && !_this6.s.enchanted[i], 'error.protected');
            _this6.require(_this6.s.gems >= 20);
            _this6.s.gems -= 20;
            _this6.s.relics = add(_this6.s.relics, mul(_this6.s.artifactInvested[i], .8));
            _this6.s.artifactInvested[i] = ZERO;
            _this6.s.artifacts[i] = 0;
            _this6.s.salvaged.push(i);
          });
        };
        _proto.rebuyArtifact = function rebuyArtifact(i, id) {
          var _this7 = this;
          return this.transaction(id, function () {
            _this7.require(_this7.s.salvaged.includes(i), 'error.invalid');
            _this7.require(_this7.s.gems >= 25);
            _this7.s.gems -= 25;
            _this7.s.salvaged = _this7.s.salvaged.filter(function (x) {
              return x !== i;
            });
            _this7.s.artifacts[i] = 1;
          });
        };
        _proto.enchantArtifact = function enchantArtifact(i, id) {
          var _this8 = this;
          return this.transaction(id, function () {
            _this8.require(_this8.s.artifacts.every(function (l) {
              return l > 0;
            }), 'error.locked');
            _this8.require(!_this8.s.enchanted[i], 'error.claimed');
            _this8.require(_this8.s.relics >= amount(1000));
            _this8.s.relics = sub(_this8.s.relics, amount(1000));
            _this8.s.enchanted[i] = 1;
          });
        };
        _proto.transmog = function transmog(slot, item, id) {
          var _this9 = this;
          return this.transaction(id, function () {
            var e = _this9.s.equipment.find(function (e) {
              return e.id === item;
            });
            _this9.require(!!e && e.slot === slot, 'error.invalid');
            _this9.s.appearance[slot] = item;
          });
        };
        _proto.achievementProgress = function achievementProgress(i) {
          return [this.s.totalTaps, this.s.totalKills, this.s.maxStage, this.s.prestiges][i];
        };
        _proto.achievementGoal = function achievementGoal(i) {
          return [100, 100, 50, 1][i] * Math.pow(2, this.s.achievements[i]);
        };
        _proto.claimAchievement = function claimAchievement(i, id) {
          var _this10 = this;
          return this.transaction(id, function () {
            _this10.require(_this10.achievementProgress(i) >= _this10.achievementGoal(i), 'error.locked');
            _this10.s.achievements[i]++;
            _this10.s.gems += 10;
          });
        };
        _proto.applySkills = function applySkills(draft, id) {
          var _this11 = this;
          return this.transaction(id, function () {
            _this11.require(draft.length === 18, 'error.invalid');
            var available = _this11.s.sp + _this11.s.skills.reduce(function (a, l) {
              return a + l * (l + 1) / 2;
            }, 0);
            var cost = 0;
            draft.forEach(function (l, i) {
              var c = SKILLS[i];
              _this11.require(Number.isInteger(l) && l >= 0 && l <= c.max, 'error.invalid');
              if (l > 0 && c.prerequisite >= 0) _this11.require(draft[c.prerequisite] >= 3, 'error.prerequisite');
              cost += l * (l + 1) / 2;
            });
            _this11.require(cost <= available);
            _this11.s.sp = available - cost;
            _this11.s.skills = [].concat(draft);
          });
        };
        _proto.drop = function drop(slot, rarity, set) {
          if (slot === void 0) {
            slot = Math.floor(this.random() * 5);
          }
          if (rarity === void 0) {
            rarity = Math.floor(this.random() * 3);
          }
          if (set === void 0) {
            set = -1;
          }
          var item = {
            id: this.s.nextItem++,
            slot: slot,
            rarity: rarity,
            level: Math.max(1, Math.floor(this.s.maxStage * (.8 + this.random() * .4))),
            power: 1 + this.s.maxStage * .003 * (rarity + 1),
            locked: false,
            set: set
          };
          this.s.equipment.push(item);
          this.s.extra.unseenEquipment.push(item.id);
          this.s.extra.dailyEquipment++;
          return item;
        };
        _proto.nextCraft = function nextCraft() {
          var part = 0;
          while (this.s.setHistory.includes(part)) part++;
          return part;
        };
        _proto.rewardNotice = function rewardNotice(kind, value, count) {
          if (count === void 0) {
            count = 1;
          }
          this.s.extra.rewardNotices.push({
            kind: kind,
            value: value,
            count: count
          });
          this.s.extra.rewardNotices = this.s.extra.rewardNotices.slice(-50);
        };
        _proto.craftCost = function craftCost(set, slot) {
          if (set === void 0) {
            set = Math.floor(this.nextCraft() / 5);
          }
          if (slot === void 0) {
            slot = this.nextCraft() % 5;
          }
          return 5 + slot;
        };
        _proto.craft = function craft(id, set, slot) {
          var _this12 = this;
          if (set === void 0) {
            set = Math.floor(this.nextCraft() / 5);
          }
          if (slot === void 0) {
            slot = this.nextCraft() % 5;
          }
          return this.transaction(id, function () {
            _this12.require(Number.isInteger(set) && set >= 0 && set < 200 && Number.isInteger(slot) && slot >= 0 && slot < 5, 'error.invalid');
            _this12.require(!_this12.s.setHistory.includes(set * 5 + slot), 'error.claimed');
            _this12.require(_this12.s.equipment.length < CONFIG.inventoryCap, 'error.full');
            var cost = _this12.craftCost(set, slot);
            _this12.require(_this12.s.shards >= cost);
            _this12.s.shards -= cost;
            _this12.drop(slot, 2, set);
            _this12.s.setHistory.push(set * 5 + slot);
            _this12.s.crafted += cost;
            if ([0, 1, 2, 3, 4].every(function (part) {
              return _this12.s.setHistory.includes(set * 5 + part);
            })) _this12.rewardNotice('equipmentSet', set + 1);
          });
        };
        _proto.equip = function equip(id) {
          var e = this.s.equipment.find(function (e) {
            return e.id === id;
          });
          if (e) {
            this.s.equipped[e.slot] = id;
            this.revision++;
            this.persist();
          }
        };
        _proto.lock = function lock(id) {
          var e = this.s.equipment.find(function (e) {
            return e.id === id;
          });
          if (e) {
            e.locked = !e.locked;
            this.persist();
            this.revision++;
          }
        };
        _proto.sell = function sell(items, id) {
          var _this13 = this;
          return this.transaction(id, function () {
            _this13.require(items.length > 0, 'error.invalid');
            var targets = _this13.s.equipment.filter(function (e) {
              return items.includes(e.id);
            });
            _this13.require(targets.length === new Set(items).size && targets.every(function (e) {
              return !e.locked && !_this13.s.equipped.includes(e.id);
            }), 'error.protected');
            _this13.s.gems += targets.reduce(function (a, e) {
              return a + e.rarity + 1;
            }, 0);
            _this13.s.equipment = _this13.s.equipment.filter(function (e) {
              return !items.includes(e.id);
            });
            _this13.s.extra.unseenEquipment = _this13.s.extra.unseenEquipment.filter(function (id) {
              return !items.includes(id);
            });
          });
        };
        _proto.hatch = function hatch(id) {
          var _this14 = this;
          return this.transaction(id, function () {
            _this14.require(_this14.s.maxStage >= 8, 'error.locked');
            _this14.require(_this14.now() >= _this14.s.eggAt, 'error.timer');
            _this14.s.pets[Math.floor(_this14.random() * 12)]++;
            _this14.s.extra.dailyEggs++;
            _this14.s.eggAt = _this14.now() + CONFIG.eggSeconds * 1000;
          });
        };
        _proto.usePerk = function usePerk(i, id) {
          var _this15 = this;
          return this.transaction(id, function () {
            _this15.require(_this15.s.perks[i] > 0);
            _this15.s.perks[i]--;
            _this15.s.perkUntil[i] = _this15.now() + 300000;
          });
        };
        _proto.dailyReset = function dailyReset() {
          var day = Math.floor(this.now() / 86400000);
          if (day > this.s.day) {
            this.s.day = day;
            this.s.dayKills = 0;
            this.s.dayTaps = 0;
            this.s.dayPrestiges = 0;
            this.s.claims = this.s.claims.filter(function (k) {
              return !k.startsWith('daily.');
            });
          }
        };
        _proto.dailyProgress = function dailyProgress(i) {
          return [1, this.s.dayTaps, this.s.dayKills, this.s.dayPrestiges][i];
        };
        _proto.dailyGoal = function dailyGoal(i) {
          return [1, 100, 50, 1][i];
        };
        _proto.claimFairy = function claimFairy(id) {
          var _this16 = this;
          return this.transaction(id, function () {
            _this16.require(_this16.now() >= _this16.s.fairyAt, 'error.timer');
            _this16.s.run.gold = add(_this16.s.run.gold, mul(_this16.goldReward(), 20));
            _this16.s.extra.dailyFairies++;
            _this16.s.fairyAt = _this16.now() + 60000;
          });
        };
        _proto.claimDaily = function claimDaily(i) {
          var _this17 = this;
          return this.transaction("daily." + this.s.day + "." + i, function () {
            var key = "daily." + i;
            _this17.require(!_this17.s.claims.includes(key), 'error.claimed');
            _this17.require(_this17.dailyProgress(i) >= _this17.dailyGoal(i), 'error.locked');
            _this17.s.claims.push(key);
            _this17.s.gems += [25, 10, 15, 25][i];
            if (i === 2) _this17.s.geodes++;
            if (i === 3) _this17.s.shards += 5;
          });
        };
        _proto.claimMilestone = function claimMilestone(stage) {
          var _this18 = this;
          return this.transaction("milestone." + stage, function () {
            var key = "milestone." + stage;
            _this18.require([8, 15, 60, 100, 500, 1000, 100000, 180000].includes(stage), 'error.invalid');
            _this18.require(!_this18.s.claims.includes(key), 'error.claimed');
            _this18.require(_this18.s.maxStage >= stage, 'error.locked');
            _this18.s.claims.push(key);
            _this18.s.gems += 25;
            _this18.s.shards += 5;
          });
        };
        _proto.collectOffline = function collectOffline(id) {
          var _this19 = this;
          return this.transaction(id, function () {
            _this19.require(_this19.s.offline > ZERO, 'error.claimed');
            _this19.s.run.gold = add(_this19.s.run.gold, _this19.s.offline);
            _this19.s.offline = ZERO;
          });
        };
        _proto.buyDeal = function buyDeal(kind, id) {
          var _this20 = this;
          return this.transaction(id, function () {
            var costs = [30, 60, 100],
              c = costs[kind];
            _this20.require(c !== undefined, 'error.invalid');
            _this20.require(_this20.s.gems >= c);
            _this20.s.gems -= c;
            if (kind === 0) _this20.s.pets[Math.floor(_this20.random() * 12)] += 3;
            if (kind === 1) _this20.s.shards += 10;
            if (kind === 2) {
              _this20.s.shards += 10;
              _this20.s.geodes++;
              var hero = Math.floor(_this20.random() * 24),
                before = Math.min.apply(Math, _this20.s.weapons);
              _this20.s.weapons[hero]++;
              _this20.rewardNotice('weapon', hero);
              if (Math.min.apply(Math, _this20.s.weapons) > before) _this20.rewardNotice('weaponSet', Math.min.apply(Math, _this20.s.weapons));
            }
          });
        };
        _proto.summon = function summon(id) {
          var _this21 = this;
          return this.transaction(id, function () {
            _this21.require(_this21.s.maxStage >= 100000 || _this21.now() - _this21.s.created >= 30 * 86400000, 'error.locked');
            _this21.require(_this21.s.souls >= 10);
            _this21.s.souls -= 10;
            _this21.s.titans[Math.floor(_this21.random() * 120)]++;
            _this21.s.extra.summonCount++;
          });
        };
        _proto.crack = function crack(id) {
          var _this22 = this;
          return this.transaction(id, function () {
            _this22.require(_this22.s.geodes > 0);
            _this22.s.geodes--;
            _this22.s.extra.geodesOpened++;
            _this22.s.stones[Math.floor(_this22.random() * 24)]++;
          });
        };
        _proto.upgradeResearch = function upgradeResearch(i, id) {
          var _this23 = this;
          return this.transaction(id, function () {
            _this23.require(Number.isInteger(i) && i >= 0 && i < _this23.s.research.length, 'error.invalid');
            var points = Math.floor(_this23.s.extra.summonCount / 5);
            var spent = _this23.s.research.reduce(function (a, b) {
              return a + b;
            }, 0);
            _this23.require(points > spent);
            if (i % 3) _this23.require(_this23.s.research[i - 1] >= 3, 'error.prerequisite');
            _this23.s.research[i]++;
          });
        };
        _proto.monument = function monument(i, id) {
          var _this24 = this;
          return this.transaction(id, function () {
            _this24.require(Number.isInteger(i) && i >= 0 && i < _this24.s.monuments.length, 'error.invalid');
            _this24.require(_this24.s.maxStage >= 180000, 'error.locked');
            var cost = amount(Math.pow(2, i) * (_this24.s.monuments[i] + 1));
            _this24.require(_this24.s.mementos >= cost);
            _this24.s.mementos = sub(_this24.s.mementos, cost);
            _this24.s.monuments[i]++;
            _this24.s.extra.monumentInvested[i] = add(_this24.s.extra.monumentInvested[i], cost);
          });
        };
        _proto.claimEvent = function claimEvent(i) {
          var _this25 = this;
          return this.transaction("event.path." + this.s.extra.eventSeason + "." + i, function () {
            var key = "event." + i;
            _this25.require(!_this25.s.claims.includes(key), 'error.claimed');
            _this25.require(Math.max(_this25.s.extra.eventEarned, _this25.s.eventTokens) >= (i + 1) * 100, 'error.locked');
            _this25.s.claims.push(key);
            _this25.s.shards += 5;
            _this25.s.gems += 15;
          });
        };
        _proto.revealTile = function revealTile(i, id) {
          var _this26 = this;
          return this.transaction(id, function () {
            _this26.require(!_this26.s.board[i], 'error.claimed');
            _this26.require(_this26.s.eventTokens >= 20);
            _this26.s.eventTokens -= 20;
            _this26.s.board[i] = Math.floor(_this26.random() * 3) + 1;
            _this26.s.gems += _this26.s.board[i] * 5;
          });
        };
        _proto.upgradeCard = function upgradeCard(i, id) {
          var _this27 = this;
          return this.transaction(id, function () {
            _this27.require(!_this27.raid || _this27.raid.claimed, 'error.protected');
            var c = _this27.s.cards[i] * 10;
            _this27.require(_this27.s.dust >= c && _this27.s.fragments[i] >= _this27.s.cards[i]);
            _this27.s.dust -= c;
            _this27.s.fragments[i] -= _this27.s.cards[i];
            _this27.s.cards[i]++;
          });
        };
        _proto.setDeck = function setDeck(i) {
          if (this.raid && !this.raid.claimed) return;
          if (Number.isInteger(i) && i >= 0 && i < 18 && !this.s.deck.includes(i)) {
            this.s.deck.shift();
            this.s.deck.push(i);
            this.persist();
            this.revision++;
          }
        };
        _proto.startRaid = function startRaid(portal) {
          var _this28 = this;
          if (portal === void 0) {
            portal = this.s.portal;
          }
          if (this.s.maxStage < 100) {
            this.notice = 'error.locked';
            return false;
          }
          if (this.raid && !this.raid.claimed) {
            this.notice = 'error.protected';
            return false;
          }
          return this.transaction("solo-start-" + this.now() + "-" + this.revision, function () {
            _this28.require(Number.isInteger(portal) && portal >= 1 && portal <= Math.min(1000, _this28.s.portal), 'error.locked');
            var hp = 1000 * Math.pow(1.2, portal - 1);
            _this28.raid = {
              expiresAt: _this28.now() + 30000,
              portal: portal,
              deck: _this28.s.deck.slice(),
              seconds: 30,
              hp: Array(8).fill(hp),
              armor: Array(8).fill(portal > 2 ? hp * .5 : 0),
              damage: 0,
              hits: 0,
              cardDamage: [0, 0, 0],
              ended: false,
              claimed: false
            };
          });
        };
        _proto.raidTap = function raidTap(part) {
          var _this29 = this;
          var r = this.raid;
          if (r && this.now() >= r.expiresAt) {
            r.seconds = 0;
            r.ended = true;
          }
          if (!r || r.ended || part < 0 || part > 7 || r.hp[part] <= 0) return;
          var damage = 12;
          r.hits++;
          r.deck.forEach(function (card, i) {
            var level = new Expansion(_this29).boostedLevel(card);
            var proc = card % 3 === 0 ? r.hits % 4 === 0 ? 30 * level : 0 : card % 3 === 1 ? level * Math.min(20, r.hits) : 5 * level;
            damage += proc;
            r.cardDamage[i] += proc;
          });
          var armor = Math.min(r.armor[part], damage);
          r.armor[part] -= armor;
          damage -= armor;
          var dealt = Math.min(r.hp[part], damage);
          r.hp[part] -= dealt;
          r.damage += dealt + armor;
          if (r.hp.every(function (h) {
            return h === 0;
          })) r.ended = true;
        };
        _proto.claimRaid = function claimRaid(id) {
          var _this30 = this;
          return this.transaction(id, function () {
            var r = _this30.raid;
            _this30.require(!!r && r.ended && !r.claimed, 'error.claimed');
            if (!r) return;
            r.claimed = true;
            _this30.s.dust += Math.floor(r.damage / 100);
            r.deck.forEach(function (i) {
              return _this30.s.fragments[i]++;
            });
            if (r.hp.every(function (h) {
              return h === 0;
            })) {
              _this30.s.portal = Math.max(_this30.s.portal, Math.min(1000, r.portal + 1));
              if (!_this30.s.extra.soloCleared.includes(r.portal)) {
                _this30.s.extra.soloCleared.push(r.portal);
                var hero = Math.floor(_this30.random() * 24);
                _this30.s.scrolls[hero]++;
                _this30.rewardNotice('scroll', hero);
              }
            }
          });
        };
        _createClass(Game, [{
          key: "raid",
          get: function get() {
            return this.s.extra.soloRaid;
          },
          set: function set(value) {
            this.s.extra.soloRaid = value;
          }
        }]);
        return Game;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameApp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Game.ts', './Amount.ts', './Config.ts', './I18n.ts', './ExpansionUI.ts', './Monetization.ts', './MonetizationUI.ts', './Online.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, _decorator, view, ResolutionPolicy, profiler, sys, input, Input, KeyCode, Color, Node, Layers, UITransform, Graphics, Label, UIOpacity, Tween, tween, Vec3, Mask, ScrollView, BlockInputEvents, resources, Texture2D, Sprite, SpriteFrame, EditBox, Component, Game, ZERO, fmt, display, ratio, SPELLS, HEROES, PETS, ARTIFACTS, CARDS, SKILLS, t, ExpansionUI, Monetization, MonetizationUI, Online;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      profiler = module.profiler;
      sys = module.sys;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      Color = module.Color;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Graphics = module.Graphics;
      Label = module.Label;
      UIOpacity = module.UIOpacity;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
      Mask = module.Mask;
      ScrollView = module.ScrollView;
      BlockInputEvents = module.BlockInputEvents;
      resources = module.resources;
      Texture2D = module.Texture2D;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      EditBox = module.EditBox;
      Component = module.Component;
    }, function (module) {
      Game = module.Game;
    }, function (module) {
      ZERO = module.ZERO;
      fmt = module.fmt;
      display = module.display;
      ratio = module.ratio;
    }, function (module) {
      SPELLS = module.SPELLS;
      HEROES = module.HEROES;
      PETS = module.PETS;
      ARTIFACTS = module.ARTIFACTS;
      CARDS = module.CARDS;
      SKILLS = module.SKILLS;
    }, function (module) {
      t = module.t;
    }, function (module) {
      ExpansionUI = module.ExpansionUI;
    }, function (module) {
      Monetization = module.Monetization;
    }, function (module) {
      MonetizationUI = module.MonetizationUI;
    }, function (module) {
      Online = module.Online;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "60749mawzZEh4clY+Zpvhxr", "GameApp", undefined);
      var ccclass = _decorator.ccclass;
      var C = {
        bg: '#101b28',
        panel: '#192838',
        raised: '#24384a',
        line: '#3c5362',
        text: '#f2e6cf',
        muted: '#a3b7bb',
        gold: '#ecc071',
        ember: '#f48960',
        mint: '#8bd3b8',
        violet: '#b99ee9',
        blue: '#82bcdd'
      };
      var GameApp = exports('GameApp', (_dec = ccclass('GameApp'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameApp, _Component);
        function GameApp() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.onlineService = void 0;
          _this.payments = void 0;
          _this.remoteBusy = false;
          _this.folded = false;
          _this.battleCast = void 0;
          _this.enemyLook = "";
          _this.seenKills = 0;
          _this.enemyTransition = 0;
          _this.allies = void 0;
          _this.allySignature = '';
          _this.allyClock = 0;
          _this.allyTurn = 0;
          _this.competitionId = 0;
          _this.extensions = void 0;
          _this.game = void 0;
          _this.root = void 0;
          _this.panel = void 0;
          _this.modal = null;
          _this.toastNode = null;
          _this.tab = 0;
          _this.mode = 1;
          _this.shopTab = 0;
          _this.filter = -1;
          _this.refresh = 0;
          _this.saveClock = 0;
          _this.lastRevision = -1;
          _this.tx = 0;
          _this.age = 0;
          _this.hpFill = void 0;
          _this.hpLabel = void 0;
          _this.stageLabel = void 0;
          _this.stageNeighbors = [];
          _this.goldLabel = void 0;
          _this.gemsLabel = void 0;
          _this.damageLabel = void 0;
          _this.manaLabel = void 0;
          _this.progressLabel = void 0;
          _this.enemyLabel = void 0;
          _this.enemy = void 0;
          _this.actor = void 0;
          _this.spellLabels = [];
          _this.particles = void 0;
          _this.bossButton = void 0;
          _this.fairy = void 0;
          _this.equipmentPile = void 0;
          _this.modalRefresh = null;
          _this.draft = [];
          _this.audioContext = null;
          _this.worldKey = -1;
          return _this;
        }
        var _proto = GameApp.prototype;
        _proto.tr = function tr(key, args) {
          if (args === void 0) {
            args = {};
          }
          return t(this.game.s.locale, key, args);
        };
        _proto.id = function id(kind) {
          return kind + ":" + Date.now() + ":" + ++this.tx;
        };
        _proto.onLoad = function onLoad() {
          view.setDesignResolutionSize(480, 960, ResolutionPolicy.SHOW_ALL);
          profiler.hideStats();
          this.game = new Game(sys.localStorage);
          this.extensions = new ExpansionUI(this);
          this.onlineService = new Online(sys.localStorage);
          this.payments = new MonetizationUI(this, new Monetization(this.game, this.onlineService));
          this.draw();
          input.on(Input.EventType.KEY_DOWN, this.key, this);
          if (this.game.s.offline > ZERO) this.offline();
        };
        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.key, this);
          this.game.persist();
        };
        _proto.key = function key(e) {
          if (e.keyCode === KeyCode.ESCAPE) this.close();
          if (e.keyCode === KeyCode.SPACE && !this.modal) this.attack();
        };
        _proto.color = function color(hex, alpha) {
          if (alpha === void 0) {
            alpha = 255;
          }
          var c = new Color();
          Color.fromHEX(c, hex);
          c.a = alpha;
          return c;
        };
        _proto.nodeAt = function nodeAt(parent, name, x, y, w, h) {
          var n = new Node(name);
          n.layer = Layers.Enum.UI_2D;
          n.parent = parent;
          n.setPosition(x, y);
          n.addComponent(UITransform).setContentSize(w, h);
          return n;
        };
        _proto.rect = function rect(parent, x, y, w, h, fill, border, alpha) {
          if (alpha === void 0) {
            alpha = 255;
          }
          var n = this.nodeAt(parent, 'shape', x, y, w, h),
            g = n.addComponent(Graphics);
          g.fillColor = this.color(fill, alpha);
          g.rect(-w / 2, -h / 2, w, h);
          g.fill();
          if (border) {
            g.strokeColor = this.color(border);
            g.lineWidth = 2;
            g.rect(-w / 2 + 1, -h / 2 + 1, w - 2, h - 2);
            g.stroke();
          }
          return n;
        };
        _proto.label = function label(parent, text, x, y, w, h, size, color, align) {
          if (size === void 0) {
            size = 18;
          }
          if (color === void 0) {
            color = C.text;
          }
          if (align === void 0) {
            align = Label.HorizontalAlign.CENTER;
          }
          var n = this.nodeAt(parent, 'text', x, y, w, h),
            l = n.addComponent(Label);
          l.string = text;
          l.fontFamily = 'Arial';
          l.fontSize = size;
          l.lineHeight = size * 1.35;
          l.color = this.color(color);
          l.horizontalAlign = align;
          l.verticalAlign = Label.VerticalAlign.CENTER;
          l.overflow = Label.Overflow.SHRINK;
          l.enableWrapText = true;
          return l;
        };
        _proto.button = function button(parent, text, x, y, w, h, action, accent) {
          if (accent === void 0) {
            accent = false;
          }
          var n = this.rect(parent, x, y, w, h, accent ? '#664839' : C.raised, accent ? C.gold : C.line);
          this.label(n, text, 0, 0, w - 12, h - 8, 16, accent ? C.gold : C.text);
          n.on(Node.EventType.TOUCH_END, function (e) {
            e.propagationStopped = true;
            action();
          });
          return n;
        };
        _proto.draw = function draw() {
          var _this2 = this;
          this.node.children.filter(function (n) {
            return n.name === 'EmberRoot';
          }).forEach(function (n) {
            n.removeFromParent();
            n.destroy();
          });
          this.root = this.nodeAt(this.node, 'EmberRoot', 0, 0, 480, 960);
          this.rect(this.root, 0, 0, 480, 960, C.bg);
          this.seenKills = this.game.s.totalKills;
          this.enemyTransition = 0;
          this.allySignature = '';
          this.world();
          var settings = this.button(this.root, '⚙', -210, 451, 38, 38, function () {
            return _this2.settings();
          });
          var gear = settings.getComponentInChildren(Label);
          gear.fontSize = 30;
          gear.lineHeight = 30;
          this.stageNeighbors = [];
          [-1, 1].forEach(function (offset, i) {
            var n = _this2.circle(_this2.root, i ? 76 : -76, 447, 18, '#69808c');
            _this2.stageNeighbors.push(_this2.label(n, String(Math.max(1, _this2.game.s.run.stage + offset)), 0, 0, 32, 30, 17));
          });
          this.circle(this.root, 0, 447, 22, '#5aaa8c');
          this.stageLabel = this.label(this.root, '', 0, 447, 42, 38, 20);
          this.bossButton = this.button(this.root, this.tr('battle.fight'), 180, 442, 111, 44, function () {
            return _this2.game.toggleBoss();
          });
          this.rect(this.root, 0, 405, 284, 20, '#14202b');
          this.hpFill = this.nodeAt(this.root, 'health', -140, 405, 280, 16);
          this.hpFill.getComponent(UITransform).setAnchorPoint(0, .5);
          this.rect(this.hpFill, 140, 0, 280, 16, '#ee762e');
          this.enemyLabel = this.label(this.root, '', -30, 405, 206, 19, 13, C.text, Label.HorizontalAlign.LEFT);
          this.hpLabel = this.label(this.root, '', 116, 405, 74, 19, 12, C.text);
          this.progressLabel = this.label(this.root, '', -113, 381, 110, 20, 12, C.ember);
          this.goldLabel = this.label(this.root, '', 15, 375, 180, 32, 27, C.gold);
          this.coin(this.root, -35, 375, 11);
          this.battleCast = this.nodeAt(this.root, 'battle-cast', 0, this.folded ? -300 : 0, 480, 600);
          this.enemy = this.nodeAt(this.battleCast, 'sentinel', 0, 95, 272, 224);
          this.sentinel(this.nodeAt(this.enemy, 'enemy-art', 0, 0, 272, 224));
          this.enemy.addComponent(UIOpacity);
          this.allies = this.nodeAt(this.battleCast, 'allies', 0, 30, 480, 500);
          this.syncAllies();
          this.actor = this.nodeAt(this.battleCast, 'guardian', -8, 0, 76, 82);
          this.guardian(this.actor);
          this.actor.setScale(.78, .78, 1);
          var target = this.nodeAt(this.root, 'battle-input', 0, this.folded ? 0 : 143, 470, this.folded ? 740 : 350);
          target.on(Node.EventType.TOUCH_END, function () {
            if (!_this2.modal) _this2.attack();
          });
          this.fairy = this.button(this.root, '✦', -211, 135, 36, 36, function () {
            return _this2.payments.fairy();
          }, true);
          this.equipmentPile = this.button(this.root, '', -206, 76, 58, 40, function () {
            return _this2.extensions.equipmentDrops();
          });
          var edge = this.folded ? -337 : -39;
          this.rect(this.root, 0, edge, 480, 20, '#54545b');
          this.button(this.root, this.folded ? '▾' : '▴', 144, edge, 65, 20, function () {
            _this2.folded = !_this2.folded;
            _this2.draw();
          });
          this.button(this.root, this.folded ? '＋' : '×', 211, edge, 65, 20, function () {
            _this2.folded = !_this2.folded;
            _this2.draw();
          });
          this.rect(this.root, 0, edge - 26, 480, 28, '#39383e');
          this.damageLabel = this.label(this.root, '', -120, edge - 26, 226, 22, 14, C.muted, Label.HorizontalAlign.LEFT);
          this.gemsLabel = this.label(this.root, '', 199, edge - 26, 67, 22, 14, C.gold);
          this.coin(this.root, 157, edge - 26, 7);
          this.manaLabel = this.label(this.root, '', 0, -313, 220, 22, 13, C.blue);
          this.manaLabel.node.active = this.folded;
          this.spellLabels = [];
          if (this.folded) {
            var _loop = function _loop(i) {
              var n = _this2.button(_this2.root, '', -200 + i * 80, -400, 73, 60, function () {
                if (_this2.game.cast(_this2.game.s.spellSlots[i])) _this2.spark(0, 95, C.violet);
                _this2.flushNotice();
              });
              _this2.label(n, ['✦', '◆', '◈', '╱', '⚑', '☾'][i], 0, 9, 65, 30, 25, C.gold);
              _this2.spellLabels.push(_this2.label(n, '', 0, -20, 70, 22, 10));
            };
            for (var i = 0; i < 6; i++) {
              _loop(i);
            }
          } else {
            this.rect(this.root, 0, -105, 480, 56, '#24232c');
            var actions = [function () {
              return _this2.cards();
            }, function () {
              return _this2.skills();
            }, function () {
              return _this2.achievements();
            }, function () {
              return _this2.extensions.inbox();
            }];
            ['menu.cards', 'master.skills', 'menu.achievements', 'menu.inbox'].forEach(function (key, i) {
              var n = _this2.nodeAt(_this2.root, 'shortcut', -195 + i * 80, -105, 76, 54);
              n.on(Node.EventType.TOUCH_END, actions[i]);
              _this2.hudIcon(_this2.nodeAt(n, 'quick-icon', 0, 8, 36, 32), i + 6, [C.blue, C.ember, C.gold, C.text][i]);
              _this2.label(n, _this2.tr(key), 0, -17, 75, 18, 10);
            });
            this.button(this.root, this.tr('master.buyMode', {
              count: this.mode === -1 ? this.tr('action.max') : this.mode
            }), 164, -105, 134, 40, function () {
              _this2.mode = [1, 10, 100, -1][([1, 10, 100, -1].indexOf(_this2.mode) + 1) % 4];
              _this2.draw();
            });
          }
          this.panel = this.nodeAt(this.root, 'panel', 0, -283, 480, 300);
          this.panel.active = !this.folded;
          this.particles = this.nodeAt(this.root, 'effects', 0, this.folded ? -300 : 0, 480, 960);
          this.drawPanel();
          this.drawNav();
          this.updateHUD();
        };
        _proto.world = function world() {
          var _this3 = this;
          var prior = this.root.getChildByName('world-art');
          if (prior) {
            prior.removeFromParent();
            prior.destroy();
          }
          var world = this.nodeAt(this.root, 'world-art', 0, 0, 480, 960);
          world.setSiblingIndex(1);
          var zone = Math.floor((this.game.s.run.stage - 1) / 25) % 4;
          this.worldKey = zone;
          var palette = [{
            sky: '#213d50',
            far: '#2c4f60',
            near: '#27454d',
            floor: '#263b39',
            edge: '#5b6651'
          }, {
            sky: '#392634',
            far: '#643b3c',
            near: '#472f35',
            floor: '#352932',
            edge: '#c07447'
          }, {
            sky: '#24364e',
            far: '#45617b',
            near: '#324960',
            floor: '#2c4559',
            edge: '#a3c8d0'
          }, {
            sky: '#292438',
            far: '#4a3c60',
            near: '#373049',
            floor: '#2b283d',
            edge: '#8974a5'
          }][zone];
          this.rect(world, 0, 0, 480, 960, this.game.s.extra.cosmetics[2] ? ['#213d50', '#3b304c', '#264943', '#493731', '#283450', '#453f28'][this.game.s.extra.cosmetics[2]] : palette.sky);
          var g = this.nodeAt(world, 'landscape', 0, 0, 480, 960).addComponent(Graphics);
          var poly = function poly(points, color) {
            g.fillColor = _this3.color(color);
            g.moveTo(points[0][0], points[0][1]);
            for (var _iterator = _createForOfIteratorHelperLoose(points.slice(1)), _step; !(_step = _iterator()).done;) {
              var p = _step.value;
              g.lineTo(p[0], p[1]);
            }
            g.close();
            g.fill();
          };
          poly([[-240, 150], [-240, 270], [-190, 270], [-190, 294], [-150, 294], [-150, 309], [-105, 309], [-105, 275], [-50, 275], [-50, 253], [20, 253], [20, 281], [70, 281], [70, 310], [98, 310], [98, 283], [150, 283], [150, 251], [200, 251], [200, 295], [240, 295], [240, 100]], palette.far);
          poly([[-240, 130], [-240, 216], [-211, 216], [-211, 244], [-169, 244], [-169, 221], [-100, 221], [-100, 184], [-35, 184], [-35, 214], [0, 214], [0, 173], [55, 173], [55, 232], [88, 232], [88, 248], [110, 248], [110, 232], [151, 232], [151, 205], [200, 205], [200, 235], [240, 235], [240, 70]], palette.near);
          this.rect(world, -180, 157, 29, 118, '#182f36');
          this.rect(world, -180, 218, 43, 13, '#345255');
          this.rect(world, 154, 128, 35, 150, '#182f36');
          this.rect(world, 154, 210, 54, 16, '#3b5a59');
          for (var i = 0; i < 6; i++) {
            var x = -225 + i * 85,
              base = this.folded ? -260 : 20;
            if (zone === 0) {
              this.rect(world, x, base + 80, 12, 120, palette.near);
              poly([[x - 35, base + 100], [x, base + 200], [x + 35, base + 100]], palette.far);
            } else if (zone === 1) {
              poly([[x - 30, base], [x - 15, base + 65 + i % 2 * 30], [x + 28, base]], palette.near);
              this.rect(world, x, base + 4, 30, 4, palette.edge);
            } else if (zone === 2) {
              poly([[x - 25, base], [x - 10, base + 88], [x + 10, base + 115], [x + 27, base]], palette.far);
              poly([[x - 10, base + 88], [x + 10, base + 115], [x + 6, base + 15]], palette.edge);
            } else {
              this.rect(world, x, base + 55, 24, 110, palette.near);
              this.rect(world, x, base + 110, 36, 10, palette.far);
              this.rect(world, x, base + 75, 6, 14, palette.edge);
            }
          }
          var ground = this.nodeAt(world, 'ground', 0, this.folded ? -300 : 0, 480, 100);
          this.rect(ground, 0, -32, 480, 28, palette.floor);
          this.rect(ground, 0, -21, 480, 6, palette.edge);
          for (var _i = 0; _i < 20; _i++) this.rect(ground, -230 + _i * 25, -27 - _i % 3 * 3, 18 + _i % 3 * 3, 4, '#3e5045');
          this.rect(world, -90, 294, 30, 4, '#62808a');
          this.rect(world, -120, 304, 48, 4, '#62808a');
          this.rect(world, 113, 350, 21, 21, '#b8c3a0');
          this.rect(world, 120, 354, 16, 21, palette.sky);
        };
        _proto.pixels = function pixels(parent, rows, palette, scale) {
          var _this4 = this;
          var g = parent.addComponent(Graphics),
            w = rows[0].length,
            h = rows.length;
          rows.forEach(function (row, y) {
            return row.split('').forEach(function (c, x) {
              if (palette[c]) {
                g.fillColor = _this4.color(palette[c]);
                g.rect((x - w / 2) * scale, (h - y) * scale - h * scale / 2, scale, scale);
                g.fill();
              }
            });
          });
        };
        _proto.sentinel = function sentinel(parent) {
          // Frontal titan: broad shoulders, long arms, small head. The player's back
          // overlaps its lower silhouette, placing the camera behind the guardian.
          var silhouette = ['   aa                      aa   ', '   aab                    baa   ', '    aabb      aaaa      bbaa    ', '     aabbbaaaabbbbaaaabbbaa     ', '      abbbbccccccccbbbba        ', '       abbccddddddccbba         ', '       abcceddccddeccba         ', '      aabcccdffffdcccb aa       ', '    aaabbbccddddddccbbbaaa      ', '  aaabbbbbbbccccccbbbbbbb aaa   ', ' aabccbbbbbbbbbbbbbbbbbbccbaa   ', ' abccccbbbbbeeeebbbbbbccccba    ', 'abcccccbbbbeffffebbbbcccccba    ', 'abcccbbabbbbeeeebbbbab bcc cba  ', 'abbccbaabbbbccccbbbbaaabcccba   ', 'abbccbaaabbbccccbbbaaaabcccba   ', 'abcccba aabbbbbbbbaa  abcccba   ', 'abcccba  abbbggbbba   abcccba   ', 'aabbbaa  abbbbbbbba   aabbbaa   ', ' aaaa    abbb  bbba    aaaa     ', '         abbb  bbba             ', '        abccb  bccba            ', '        abccb  bccba            ', '       aabbbb  bbbbaa           ', '      aaabbbb  bbbbaaa          '];
          var species = this.game.s.run.boss ? 3 : this.game.s.totalKills % 3;
          if (species === 1) {
            silhouette[0] = '       aa              aa       ';
            silhouette[1] = '       aaa            aaa       ';
            silhouette[2] = '        aa    aaaa    aa        ';
            for (var y = 10; y < 19; y++) silhouette[y] = 'aa' + silhouette[y].slice(2, -2) + 'aa';
          }
          if (species === 2) {
            silhouette[0] = '              aaaa              ';
            silhouette[1] = '             aabbaa             ';
            silhouette[2] = '            aabbbbaa            ';
            silhouette[6] = '       abccddffffddccba         ';
            silhouette[7] = '      aabcccddddddccbaa         ';
          }
          if (species === 3) {
            silhouette[0] = '    ff      ff  ff      ff      ';
            silhouette[1] = '    aaf    faaffaaf    faa      ';
            silhouette[2] = '     aabbaaabbbbaaabbaa         ';
          }
          this.pixels(parent, silhouette, {
            a: '#172a31',
            b: ['#3c5860', '#5b435f', '#674633', '#35565c', '#4f5c37', '#584854'][(this.game.s.totalKills + Math.floor(this.game.s.run.stage / 25)) % 6],
            c: ['#73908b', '#9982a2', '#b28a60', '#80adbd', '#a0ae73', '#aa8398'][(this.game.s.totalKills + Math.floor(this.game.s.run.stage / 25)) % 6],
            d: '#a5b9a0',
            e: '#6f342f',
            f: this.game.s.run.boss ? '#ff6655' : '#ffc176',
            g: '#ba8050'
          }, 8);
        };
        _proto.guardian = function guardian(parent) {
          // Back view: dark hair/helmet and cape, no face or eyes.
          this.pixels(parent, ['       aaa         ', '      aabba        ', '      abbbba       ', '      aabbba    f  ', '       aaa      f  ', '    aaddddaa    f  ', '   abddddddba   f  ', '   abdeeeddbac  f  ', '   abdeeeddbacc f  ', '    bdeeeedb  fffff', '    ddeeedd    f   ', '   dddeeeddd       ', '   ddddddddd       ', '    aa  aa         ', '    aa  aa         ', '   aaa  aaa        '], {
            a: this.appearanceTint(4, '#152630'),
            b: this.appearanceTint(1, '#728592'),
            c: '#cc9c79',
            d: this.appearanceTint(2, ['#aa4e40', C.gold, C.blue, C.violet, C.mint, '#d9d7cc'][this.game.s.extra.cosmetics[0]]),
            e: this.appearanceTint(3, '#d77750'),
            f: this.appearanceTint(0, '#edcc8d')
          }, 4.5);
        };
        _proto.appearanceTint = function appearanceTint(slot, fallback) {
          var value = this.game.s.appearance[slot];
          return value < 0 ? fallback : [C.gold, C.ember, C.blue, C.violet, C.mint][value % 5];
        };
        _proto.enemyKey = function enemyKey() {
          return this.game.s.totalKills + ":" + this.game.s.run.boss + ":" + Math.floor((this.game.s.run.stage - 1) / 25);
        };
        _proto.syncEnemyDeath = function syncEnemyDeath() {
          var _this5 = this;
          if (this.game.s.totalKills === this.seenKills) return;
          this.seenKills = this.game.s.totalKills;
          this.enemyTransition = .65;
          var defeated = this.enemy;
          Tween.stopAllByTarget(defeated);
          var opacity = defeated.getComponent(UIOpacity);
          Tween.stopAllByTarget(opacity);
          tween(defeated).to(.14, {
            scale: new Vec3(1.45, .55, 1)
          }).call(function () {
            if (defeated.isValid) defeated.active = false;
          }).start();
          tween(opacity).to(.14, {
            opacity: 0
          }).start();
          var _loop2 = function _loop2() {
            var angle = i * Math.PI * 2 / 18,
              n = _this5.rect(_this5.particles, 0, 95, 8 + i % 3 * 3, 8 + i % 3 * 3, i % 3 ? C.gold : C.ember);
            tween(n).to(.32, {
              position: new Vec3(Math.cos(angle) * (85 + i % 4 * 16), 95 + Math.sin(angle) * 105, 0),
              scale: new Vec3(.1, .1, 1),
              angle: i * 35
            }).call(function () {
              return n.destroy();
            }).start();
          };
          for (var i = 0; i < 18; i++) {
            _loop2();
          }
          this.sound(95);
          this.updateHUD();
        };
        _proto.spawnEnemy = function spawnEnemy() {
          Tween.stopAllByTarget(this.enemy);
          this.clear(this.enemy);
          this.enemy.active = true;
          this.enemy.setPosition(0, 95);
          var opacity = this.enemy.getComponent(UIOpacity);
          Tween.stopAllByTarget(opacity);
          opacity.opacity = 255;
          this.sentinel(this.nodeAt(this.enemy, 'enemy-art', 0, 0, 272, 224));
          this.enemyLook = this.enemyKey();
          this.enemy.setScale(.65, .65, 1);
          tween(this.enemy).to(.18, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).start();
        };
        _proto.syncAllies = function syncAllies() {
          var _this6 = this;
          var ids = this.game.s.run.heroes.map(function (level, i) {
              return level > 0 ? i : -1;
            }).filter(function (i) {
              return i >= 0;
            }),
            key = ids.join(',');
          if (this.allySignature === key) return;
          this.allySignature = key;
          this.clear(this.allies);
          ids.forEach(function (id, index) {
            var side = index % 2 ? -1 : 1,
              x = side * (178 - (index >= 12 ? 42 : 0)),
              y = -39 + Math.floor(index % 12 / 2) * 46;
            _this6.rect(_this6.allies, x, y - 25, 66, 6, '#516455');
            var actor = _this6.nodeAt(_this6.allies, "hero-" + id, x, y, 58, 54),
              body = _this6.nodeAt(actor, 'body', 0, 0, 32, 48);
            var tint = [C.ember, C.mint, C.blue, C.violet, C.gold, '#bd8473'][id % 6];
            _this6.pixels(body, ['    aaaa    ', '   abbbba   ', '   abbbba   ', '    acca    ', '    adda    ', '  aaddddaa  ', ' aaddddddaa ', ' aaddddddaa ', ' aeaddddaea ', ' aeaddddaea ', ' aeaddddaea ', ' aeaddddaea ', '  aaddddaa  ', '   aaaa aa  ', '   affa fa  ', '   affa fa  ', '   affa fa  ', '  aaaa aaaa '], {
              a: '#14232e',
              b: '#8a9aa4',
              c: '#c99d75',
              d: tint,
              e: '#c8c4a5',
              f: '#455464'
            }, ids.length > 12 ? 1.8 : 2.5);
            var weapon = _this6.nodeAt(actor, 'weapon', -side * 13, 0, 20, 40);
            if (id % 3 === 0) {
              _this6.rect(weapon, 0, 5, 3, 27, '#e9d6a0');
              _this6.rect(weapon, 0, -5, 13, 3, C.gold);
            } else if (id % 3 === 1) {
              var bow = weapon.addComponent(Graphics);
              bow.strokeColor = _this6.color(C.gold);
              bow.lineWidth = 3;
              bow.moveTo(0, 18);
              bow.lineTo(-side * 8, 0);
              bow.lineTo(0, -18);
              bow.stroke();
              bow.lineWidth = 1;
              bow.moveTo(0, 18);
              bow.lineTo(0, -18);
              bow.stroke();
            } else {
              _this6.rect(weapon, 0, 2, 3, 35, '#a47f65');
              _this6.rect(weapon, 0, 21, 9, 9, C.violet);
            }
            body.setScale(-side, 1, 1);
            _this6.label(actor, _this6.tr("hero." + id), 0, -33, 72, 16, 11, C.text);
          });
        };
        _proto.animateAlly = function animateAlly() {
          var _this7 = this;
          var actors = this.allies.children.filter(function (n) {
            return n.name.startsWith('hero-');
          });
          if (!actors.length) return;
          var ally = actors[this.allyTurn++ % actors.length],
            body = ally.getChildByName('body');
          tween(body).to(.1, {
            angle: ally.position.x > 0 ? 18 : -18
          }).to(.18, {
            angle: 0
          }).start();
          var role = Number(ally.name.slice(5)) % 3;
          var missile = this.rect(this.particles, ally.position.x, ally.position.y, role === 2 ? 9 : 16, role === 2 ? 9 : 3, role === 2 ? C.violet : C.gold);
          tween(missile).to(.24, {
            position: new Vec3(0, 100, 0)
          }).call(function () {
            missile.destroy();
            if (!_this7.enemyTransition) _this7.spark(0, 100, C.ember);
          }).start();
        };
        _proto.circle = function circle(parent, x, y, radius, color) {
          var n = this.nodeAt(parent, 'circle', x, y, radius * 2, radius * 2),
            g = n.addComponent(Graphics);
          g.fillColor = this.color(color);
          g.circle(0, 0, radius);
          g.fill();
          g.strokeColor = this.color('#d5dedb');
          g.lineWidth = 2;
          g.stroke();
          return n;
        };
        _proto.coin = function coin(parent, x, y, r) {
          var n = this.circle(parent, x, y, r, '#e9b82b');
          this.rect(n, 0, 0, 2, r * 1.25, '#fff2a2');
        };
        _proto.hudIcon = function hudIcon(n, kind, color) {
          var g = n.addComponent(Graphics);
          g.fillColor = this.color(color);
          g.strokeColor = this.color(color);
          g.lineWidth = 3;
          var poly = function poly(points) {
            g.moveTo(points[0][0], points[0][1]);
            points.slice(1).forEach(function (p) {
              return g.lineTo(p[0], p[1]);
            });
            g.close();
            g.fill();
          };
          if (kind === 0) {
            poly([[-13, -16], [-8, -20], [17, 12], [19, 23], [8, 17]]);
            g.moveTo(-17, -8);
            g.lineTo(-3, -18);
            g.stroke();
          } else if (kind === 1) {
            g.circle(0, 12, 7);
            g.fill();
            poly([[-6, 5], [6, 5], [11, -12], [5, -12], [5, -22], [-5, -22], [-5, -12], [-11, -12]]);
          } else if (kind === 2) poly([[-8, 18], [-22, 10], [-15, -1], [-9, 2], [-9, -19], [9, -19], [9, 2], [15, -1], [22, 10], [8, 18], [4, 12], [-4, 12]]);else if (kind === 3) {
            poly([[-14, -18], [-14, 9], [-20, 19], [-5, 15], [7, 14], [15, 21], [17, -18]]);
            g.fillColor = this.color('#26303a');
            g.circle(-5, 4, 2);
            g.circle(7, 4, 2);
            g.fill();
          } else if (kind === 4) poly([[0, -21], [-21, 2], [-21, 12], [-13, 19], [-5, 19], [0, 12], [5, 19], [13, 19], [21, 12], [21, 2]]);else if (kind === 5) {
            g.rect(-20, -17, 40, 29);
            g.fill();
            g.fillColor = this.color('#162330');
            g.rect(-20, 0, 40, 4);
            g.fill();
            g.fillColor = this.color(color);
            g.rect(-17, 15, 34, 5);
            g.fill();
          } else if (kind === 6) {
            g.rect(-14, -15, 23, 29);
            g.stroke();
            g.rect(-9, -11, 23, 29);
            g.stroke();
            g.circle(2, 4, 6);
            g.stroke();
          } else if (kind === 7) {
            g.rect(-14, -18, 28, 36);
            g.fill();
            g.fillColor = this.color('#f4d174');
            poly([[-9, 0], [0, 12], [9, 0], [4, 0], [4, -10], [-4, -10], [-4, 0]]);
          } else if (kind === 8) {
            poly([[-12, 15], [12, 15], [9, -2], [3, -7], [3, -14], [11, -18], [-11, -18], [-3, -14], [-3, -7], [-9, -2]]);
            g.moveTo(-12, 10);
            g.lineTo(-19, 10);
            g.lineTo(-16, 0);
            g.lineTo(-8, -5);
            g.moveTo(12, 10);
            g.lineTo(19, 10);
            g.lineTo(16, 0);
            g.lineTo(8, -5);
            g.stroke();
          } else {
            g.rect(-19, -13, 38, 26);
            g.fill();
            g.strokeColor = this.color('#7e8490');
            g.lineWidth = 2;
            g.moveTo(-18, 12);
            g.lineTo(0, -2);
            g.lineTo(18, 12);
            g.stroke();
          }
        };
        _proto.drawNav = function drawNav() {
          var _this8 = this;
          var old = this.root.getChildByName('navigation');
          if (old) {
            old.removeFromParent();
            old.destroy();
          }
          var nav = this.nodeAt(this.root, 'navigation', 0, -456, 480, 48);
          this.rect(nav, 0, 0, 480, 48, '#49494e');
          var _loop3 = function _loop3(i) {
            var n = _this8.rect(nav, -200 + i * 80, 0, 78, 46, i === _this8.tab ? '#e98436' : '#696b70', '#30343b');
            n.on(Node.EventType.TOUCH_END, function () {
              _this8.tab = i;
              _this8.filter = -1;
              _this8.folded = false;
              _this8.draw();
            });
            _this8.hudIcon(_this8.nodeAt(n, 'tab-icon', 0, 0, 48, 44), i, i === _this8.tab ? C.text : '#151b24');
            if (i === 3 && _this8.game.s.maxStage >= 8 && Date.now() >= _this8.game.s.eggAt) _this8.rect(n, 28, 17, 6, 6, C.ember);
          };
          for (var i = 0; i < 6; i++) {
            _loop3(i);
          }
        };
        _proto.scroll = function scroll(parent, x, y, w, h, rows) {
          var _this9 = this;
          var viewport = this.nodeAt(parent, 'scroll', x, y, w, h);
          viewport.addComponent(Mask);
          var sv = viewport.addComponent(ScrollView);
          sv.horizontal = false;
          sv.vertical = true;
          sv.inertia = true;
          sv.brake = .7;
          var content = this.nodeAt(viewport, 'content', 0, h / 2, w, Math.max(h, rows.length * 77));
          content.getComponent(UITransform).setAnchorPoint(.5, 1);
          sv.content = content;
          rows.forEach(function (r, i) {
            var yy = -39 - i * 77;
            var card = _this9.rect(content, 0, yy, w - 8, 70, C.panel, C.line);
            if (r.icon !== undefined) _this9.glyph(card, -w / 2 + 35, 0, r.icon, r.tint || C.gold);
            var hasIcon = r.icon !== undefined,
              hasAction = !!r.action;
            var left = -w / 2 + (hasIcon ? 66 : 16),
              right = w / 2 - (hasAction ? 125 : 16),
              width = right - left;
            _this9.label(card, r.title, left + width / 2, r.sub ? 11 : 0, width, 27, 16, C.text, Label.HorizontalAlign.LEFT);
            if (r.sub) _this9.label(card, r.sub, left + width / 2, -15, width, 34, 12, C.muted, Label.HorizontalAlign.LEFT);
            if (r.detail) {
              var target = _this9.nodeAt(card, "details", -w / 2 + 120, 0, 210, 65);
              target.on(Node.EventType.TOUCH_END, r.detail);
            }
            if (r.action) _this9.button(card, r.action, w / 2 - 65, 0, 112, 48, r.click || function () {}, true);else if (r.click) card.on(Node.EventType.TOUCH_END, r.click);
          });
        };
        _proto.glyph = function glyph(parent, x, y, id, color) {
          var n = this.rect(parent, x, y, 42, 44, '#122131', color),
            g = this.nodeAt(n, 'glyph', 0, 0, 40, 40).addComponent(Graphics);
          g.fillColor = this.color(color);
          if (id % 3 === 0) {
            g.rect(-3, -13, 6, 26);
            g.rect(-11, -5, 22, 5);
          } else if (id % 3 === 1) {
            g.moveTo(0, 15);
            g.lineTo(13, 0);
            g.lineTo(0, -15);
            g.lineTo(-13, 0);
            g.close();
          } else {
            g.rect(-11, -11, 22, 22);
            g.rect(-5, 11, 10, 4);
          }
          g.fill();
        };
        _proto.clear = function clear(n) {
          for (var _i2 = 0, _arr = [].concat(n.children); _i2 < _arr.length; _i2++) {
            var c = _arr[_i2];
            c.removeFromParent();
            c.destroy();
          }
        };
        _proto.drawPanel = function drawPanel() {
          var _this10 = this;
          this.clear(this.panel);
          var g = this.game,
            s = g.s,
            r = s.run;
          this.rect(this.panel, 0, 0, 480, 300, C.bg);
          if (this.tab === 0) {
            this.rect(this.panel, 0, 112, 470, 65, '#333538', C.line);
            this.rect(this.panel, -201, 113, 54, 59, '#1b2934', C.line);
            this.hudIcon(this.nodeAt(this.panel, 'master-portrait', -201, 113, 50, 54), 0, C.blue);
            this.label(this.panel, this.tr('layout.masterName'), -64, 131, 228, 22, 16, C.text, Label.HorizontalAlign.LEFT);
            this.label(this.panel, this.tr('master.level', {
              level: r.master,
              damage: this.format(g.tapDamage())
            }), -64, 106, 228, 31, 12, C.muted, Label.HorizontalAlign.LEFT);
            var up = this.rect(this.panel, 164, 112, 135, 60, '#e87e12', C.gold);
            this.rect(up, 0, 21, 131, 16, '#794528');
            this.label(up, this.format(g.upgradeCost(-1, this.mode === -1 ? 1 : this.mode)), 0, 21, 127, 16, 12, C.gold);
            this.label(up, this.tr('layout.upgrade'), 0, -6, 125, 35, 18);
            up.on(Node.EventType.TOUCH_END, function () {
              g.buy(-1, _this10.mode);
              _this10.drawPanel();
              _this10.flushNotice();
            });
            this.rect(this.panel, 0, 62, 470, 26, '#292a37');
            this.label(this.panel, this.tr('master.prestige'), 0, 62, 430, 24, 18);
            this.rect(this.panel, 0, 13, 470, 68, '#333538', C.line);
            this.glyph(this.panel, -201, 13, 1, C.blue);
            this.label(this.panel, this.tr('layout.prestigeDesc'), -64, 13, 228, 60, 13, C.text, Label.HorizontalAlign.LEFT);
            this.button(this.panel, this.tr(r.stage >= 60 ? 'prestige.reward' : 'prestige.locked', {
              value: this.format(g.prestigeReward())
            }), 164, 13, 135, 60, function () {
              return _this10.prestige();
            }, r.stage >= 60);
            this.rect(this.panel, 0, -36, 470, 26, '#292a37');
            this.label(this.panel, this.tr('spell.title'), 0, -36, 430, 24, 18);
            this.scroll(this.panel, 0, -100, 474, 99, SPELLS.map(function (sp) {
              return {
                title: _this10.tr("spell." + sp.id),
                sub: _this10.tr('spell.detail', {
                  level: r.spellLevels[sp.id],
                  unlock: sp.unlock,
                  mana: sp.mana
                }),
                icon: sp.id,
                action: _this10.tr(r.master < sp.unlock ? 'action.level' : 'action.details', {
                  level: sp.unlock
                }),
                click: function click() {
                  return _this10.spells(_this10.game.s.spellSlots.indexOf(sp.id) < 0 ? 0 : _this10.game.s.spellSlots.indexOf(sp.id));
                }
              };
            }));
          } else if (this.tab === 1) {
            this.label(this.panel, this.tr('hero.title'), -133, 127, 190, 29, 21, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, this.tr('master.buyMode', {
              count: this.mode === -1 ? this.tr('action.max') : this.mode
            }), 80, 127, 127, 34, function () {
              _this10.mode = [1, 10, 100, -1][([1, 10, 100, -1].indexOf(_this10.mode) + 1) % 4];
              _this10.drawPanel();
            });
            this.button(this.panel, '◈', 200, 127, 49, 34, function () {
              return _this10.mastery();
            });
            this.scroll(this.panel, 0, -24, 458, 244, HEROES.map(function (h) {
              return {
                title: _this10.tr(h.name),
                sub: s.maxStage < h.unlock ? _this10.tr('hero.locked', {
                  stage: h.unlock
                }) : _this10.tr('hero.stats', {
                  level: r.heroes[h.id],
                  damage: _this10.format(g.heroDamage(h.id))
                }),
                detail: function detail() {
                  return _this10.extensions.hero(h.id);
                },
                icon: h.id,
                tint: [C.ember, C.mint, C.blue, C.violet][h.id % 4],
                action: _this10.format(g.upgradeCost(h.id, _this10.mode === -1 ? 1 : _this10.mode)),
                click: function click() {
                  g.buy(h.id, _this10.mode);
                  _this10.drawPanel();
                  _this10.flushNotice();
                }
              };
            }));
          } else if (this.tab === 2) {
            this.label(this.panel, this.tr('equipment.summary', {
              shards: s.shards,
              count: s.equipment.length
            }), -112, 127, 230, 28, 17, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, '⋯', 44, 127, 48, 34, function () {
              return _this10.equipmentTools();
            });
            this.button(this.panel, this.tr('equipment.craft'), 172, 127, 110, 34, function () {
              return _this10.craft();
            });
            var _loop4 = function _loop4(i) {
              _this10.button(_this10.panel, _this10.tr("slot." + i), -180 + i * 90, 82, 84, 32, function () {
                _this10.filter = _this10.filter === i ? -1 : i;
                _this10.drawPanel();
              }, _this10.filter === i);
            };
            for (var i = 0; i < 5; i++) {
              _loop4(i);
            }
            var items = s.equipment.filter(function (e) {
              return _this10.filter < 0 || e.slot === _this10.filter;
            }).sort(function (a, b) {
              return b.power - a.power;
            });
            this.scroll(this.panel, 0, -46, 458, 204, items.map(function (e) {
              return {
                title: _this10.itemName(e),
                sub: _this10.tr('equipment.power', {
                  power: e.power.toFixed(2)
                }),
                action: s.equipped.includes(e.id) ? _this10.tr('action.equipped') : _this10.tr('action.details'),
                icon: e.slot,
                tint: e.rarity > 1 ? C.gold : C.blue,
                click: function click() {
                  return _this10.item(e);
                }
              };
            }));
            if (!items.length) this.label(this.panel, this.tr('equipment.empty'), 0, -22, 410, 60, 16, C.muted);
          } else if (this.tab === 3) {
            this.label(this.panel, this.tr('pet.title'), -112, 127, 220, 28, 21, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, Date.now() >= s.eggAt ? this.tr('pet.hatch') : this.tr('action.remaining', {
              seconds: Math.ceil((s.eggAt - Date.now()) / 1000)
            }), 143, 127, 164, 36, function () {
              return _this10.act(function () {
                return g.hatch(_this10.id('egg'));
              }, function () {
                return _this10.drawPanel();
              });
            });
            this.scroll(this.panel, 0, -24, 458, 244, PETS.map(function (p) {
              return {
                title: _this10.tr(p.name),
                sub: _this10.tr('pet.bonus', {
                  level: s.pets[p.id],
                  bonus: _this10.tr("effect." + p.effect)
                }),
                detail: function detail() {
                  return _this10.extensions.petDetail(p.id);
                },
                icon: p.id,
                tint: C.mint,
                action: s.activePet === p.id && s.pets[p.id] > 0 ? _this10.tr('action.equipped') : _this10.tr('action.equip'),
                click: function click() {
                  if (!s.pets[p.id]) _this10.toast(_this10.tr('error.locked'));else {
                    s.activePet = p.id;
                    g.persist();
                    _this10.drawPanel();
                  }
                }
              };
            }));
          } else if (this.tab === 4) {
            this.label(this.panel, this.tr('artifact.balance', {
              value: this.format(s.relics)
            }), -89, 127, 273, 26, 17, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, this.tr('artifact.discover', {
              cost: this.format(g.discoverCost())
            }), 149, 127, 154, 36, function () {
              return _this10.act(function () {
                return g.discover(_this10.id('discover'));
              }, function () {
                return _this10.drawPanel();
              });
            }, true);
            var owned = ARTIFACTS.filter(function (a) {
              return s.artifacts[a.id];
            });
            this.button(this.panel, '⋯', -208, 89, 40, 26, function () {
              return _this10.salvaged();
            });
            this.scroll(this.panel, 0, -37, 458, 221, owned.map(function (a) {
              return {
                title: _this10.tr(a.name),
                sub: _this10.tr('artifact.stats', {
                  level: s.artifacts[a.id],
                  effect: _this10.tr("effect." + a.effect)
                }),
                icon: a.id,
                tint: C.violet,
                action: _this10.tr('action.details'),
                click: function click() {
                  return _this10.artifactDetail(a.id);
                }
              };
            }));
            if (!owned.length) {
              this.glyph(this.panel, 0, 28, 1, C.violet);
              this.label(this.panel, this.tr('artifact.empty'), 0, -45, 365, 70, 17, C.muted);
            }
          } else {
            [0, 1, 2].forEach(function (i) {
              return _this10.button(_this10.panel, _this10.tr(['shop.regular', 'shop.progression', 'shop.limited'][i]), -151 + i * 151, 127, 142, 38, function () {
                _this10.shopTab = i;
                _this10.drawPanel();
              }, _this10.shopTab === i);
            });
            var rows = this.shopTab === 0 ? [{
              title: this.tr('shop.free'),
              sub: this.tr('daily.reward', {
                gems: 25
              }),
              action: this.tr('action.claim'),
              click: function click() {
                return _this10.act(function () {
                  return g.claimDaily(0);
                }, function () {
                  return _this10.drawPanel();
                });
              }
            }].concat([0, 1, 2].map(function (i) {
              return {
                title: _this10.tr(['shop.pet', 'shop.shards', 'shop.chest'][i]),
                sub: _this10.tr('action.cost', {
                  cost: [30, 60, 100][i]
                }),
                icon: i,
                tint: C.gold,
                action: _this10.tr('action.buy'),
                click: function click() {
                  return _this10.confirm(_this10.tr(['shop.pet', 'shop.shards', 'shop.chest'][i]), _this10.tr('shop.confirm', {
                    cost: [30, 60, 100][i]
                  }) + (i === 2 ? '\n' + _this10.tr('shop.chestInfo') : ''), function () {
                    return _this10.act(function () {
                      return g.buyDeal(i, _this10.id('deal'));
                    }, function () {
                      _this10.close();
                      _this10.drawPanel();
                    });
                  });
                }
              };
            })) : this.shopTab === 1 ? [60, 100, 500, 1000].map(function (stage) {
              return {
                title: _this10.tr('milestone.row', {
                  stage: stage
                }),
                action: _this10.tr(s.claims.includes("milestone." + stage) ? 'action.claimed' : 'action.claim'),
                click: function click() {
                  return _this10.act(function () {
                    return g.claimMilestone(stage);
                  }, function () {
                    return _this10.drawPanel();
                  });
                }
              };
            }) : [{
              title: this.tr('extra.limitedOffer'),
              sub: this.tr('extra.limitedInfo'),
              action: this.tr('action.open'),
              click: function click() {
                return _this10.extensions.limited();
              }
            }];
            rows.unshift({
              title: this.tr('money.store'),
              sub: this.tr('money.balance', {
                count: s.gems
              }),
              action: this.tr('action.open'),
              click: function click() {
                return _this10.payments.store();
              }
            });
            if (this.shopTab === 0) rows.splice(1, 0, {
              title: this.tr('money.ad.shop_chest'),
              sub: this.tr('money.adReward.shop_chest'),
              action: this.tr('money.watch'),
              click: function click() {
                return _this10.payments.ads('shop');
              }
            });
            if (this.shopTab === 2) rows.unshift({
              title: this.tr('money.pass'),
              action: this.payments.price('season_pass'),
              click: function click() {
                return _this10.payments.product('season_pass');
              }
            });
            this.scroll(this.panel, 0, -24, 458, 244, rows);
          }
        };
        _proto.itemName = function itemName(e) {
          return this.tr('equipment.item', {
            slot: this.tr("slot." + e.slot),
            rarity: this.tr("rarity." + e.rarity),
            level: e.level
          });
        };
        _proto.open = function open(title, height) {
          var _this11 = this;
          if (height === void 0) {
            height = 600;
          }
          this.close();
          this.modal = this.nodeAt(this.root, 'modal', 0, 0, 480, 960);
          this.modal.addComponent(BlockInputEvents);
          this.rect(this.modal, 0, 0, 480, 960, '#000000', undefined, 128);
          var box = this.rect(this.modal, 0, 0, 432, height, C.bg, [C.line, C.gold, C.blue, C.violet, C.mint, C.ember][this.game.s.extra.cosmetics[1]]);
          box.name = 'modal-panel';
          this.rect(box, 0, height / 2 - 4, 432, 6, C.gold);
          this.label(box, title, -17, height / 2 - 38, 350, 44, 23, C.gold);
          this.button(box, '×', 181, height / 2 - 36, 42, 38, function () {
            return _this11.close();
          });
          return box;
        };
        _proto.close = function close() {
          this.modalRefresh = null;
          if (this.modal) {
            this.modal.removeFromParent();
            this.modal.destroy();
            this.modal = null;
          }
        };
        _proto.confirm = function confirm(title, body, yes) {
          var _this12 = this;
          var p = this.open(title, 370);
          this.label(p, body, 0, 10, 372, 195, 19, C.text);
          this.button(p, this.tr('action.cancel'), -103, -132, 178, 48, function () {
            return _this12.close();
          });
          this.button(p, this.tr('action.confirm'), 103, -132, 178, 48, yes, true);
        };
        _proto.info = function info(title, body) {
          var _this13 = this;
          var p = this.open(title, 390);
          this.label(p, body, 0, 0, 375, 245, 18, C.text);
          this.button(p, this.tr('action.close'), 0, -145, 260, 45, function () {
            return _this13.close();
          });
        };
        _proto.act = function act(action, done) {
          if (action()) {
            this.sound(600);
            if (done) done();
            this.toast(this.tr('complete.applied'));
            this.updateHUD();
          } else this.flushNotice();
        };
        _proto.menu = function menu() {
          var _this14 = this;
          var p = this.open(this.tr('menu.title'), 706);
          var actions = [['daily', function () {
            return _this14.daily();
          }], ['milestones', function () {
            return _this14.milestones();
          }], ['raid', function () {
            return _this14.raidLobby();
          }], ['cards', function () {
            return _this14.cards();
          }], ['event', function () {
            return _this14.events();
          }], ['meta', function () {
            return _this14.meta();
          }], ['clan', function () {
            return _this14.guild();
          }], ['tournament', function () {
            return _this14.competition();
          }], ['profile', function () {
            return _this14.profile();
          }], ['settings', function () {
            return _this14.settings();
          }], ['inbox', function () {
            return _this14.extensions.inbox();
          }], ['achievements', function () {
            return _this14.achievements();
          }]];
          actions.forEach(function (_ref, i) {
            var key = _ref[0],
              f = _ref[1];
            return _this14.button(p, _this14.tr("menu." + key), i % 2 ? -101 : 101, 245 - Math.floor(i / 2) * 91, 184, 70, f);
          });
          this.button(p, this.tr('extra.hub'), 0, -304, 380, 44, function () {
            return _this14.extensions.hub();
          });
        };
        _proto.prestige = function prestige() {
          var _this15 = this;
          var g = this.game;
          this.confirm(this.tr('prestige.title'), this.tr('prestige.desc') + '\n\n' + this.tr('prestige.reward', {
            value: this.format(g.prestigeReward())
          }) + '\n' + this.tr('prestige.start', {
            stage: Math.max(1, Math.floor(g.s.maxStage * .05))
          }), function () {
            if (g.prestige(_this15.id('prestige'))) {
              _this15.close();
              _this15.drawPanel();
              _this15.toast(_this15.tr('prestige.done'));
            } else _this15.flushNotice();
          });
        };
        _proto.item = function item(e) {
          var _this16 = this;
          var current = this.game.s.equipment.find(function (x) {
            return x.id === _this16.game.s.equipped[e.slot];
          });
          var p = this.open(this.itemName(e), 470);
          this.glyph(p, 0, 100, e.slot, C.gold);
          this.label(p, this.tr('equipment.compare', {
            current: ((current == null ? void 0 : current.power) || 1).toFixed(2),
            next: e.power.toFixed(2)
          }), 0, 33, 370, 50, 20);
          this.label(p, e.locked ? this.tr('equipment.protected') : '', 0, -4, 370, 24, 14, C.ember);
          this.button(p, this.tr('action.equip'), 0, -54, 360, 46, function () {
            _this16.game.equip(e.id);
            _this16.close();
            _this16.drawPanel();
          }, true);
          this.button(p, this.tr('action.lock'), -93, -113, 175, 44, function () {
            _this16.game.lock(e.id);
            _this16.item(e);
          });
          this.button(p, this.tr('action.sell'), 93, -113, 175, 44, function () {
            return _this16.confirm(_this16.itemName(e), _this16.tr('equipment.sellConfirm'), function () {
              return _this16.act(function () {
                return _this16.game.sell([e.id], _this16.id('sell'));
              }, function () {
                _this16.close();
                _this16.drawPanel();
              });
            });
          });
          this.button(p, this.tr('equipment.sets'), 0, -173, 360, 42, function () {
            return _this16.sets();
          });
        };
        _proto.craft = function craft() {
          var _this17 = this;
          this.confirm(this.tr('equipment.craft'), this.tr('equipment.craftDesc', {
            cost: this.game.craftCost(),
            shards: this.game.s.shards
          }), function () {
            return _this17.act(function () {
              return _this17.game.craft(_this17.id('craft'));
            }, function () {
              _this17.close();
              _this17.drawPanel();
              var last = _this17.game.s.equipment[_this17.game.s.equipment.length - 1];
              _this17.item(last);
            });
          });
        };
        _proto.sets = function sets() {
          this.extensions.equipmentSets();
        };
        _proto.oldSets = function oldSets() {
          var s = this.game.s;
          this.info(this.tr('equipment.sets'), this.tr('equipment.setInfo', {
            count: s.setHistory.length,
            sets: Math.floor(s.setHistory.length / 5),
            spent: s.crafted
          }));
        };
        _proto.skills = function skills(fresh) {
          var _this18 = this;
          if (fresh === void 0) {
            fresh = true;
          }
          if (fresh) this.draft = [].concat(this.game.s.skills);
          var s = this.game.s,
            p = this.open(this.tr('skills.title'), 718);
          var total = s.sp + s.skills.reduce(function (a, l) {
              return a + l * (l + 1) / 2;
            }, 0),
            cost = this.draft.reduce(function (a, l) {
              return a + l * (l + 1) / 2;
            }, 0);
          this.label(p, this.tr('skills.points', {
            points: total - cost,
            cost: cost
          }), 0, 281, 382, 32, 17, C.mint);
          this.label(p, this.tr('skills.info'), 0, 221, 382, 80, 13, C.muted);
          for (var branch = 0; branch < 6; branch++) {
            var x = -132 + branch % 3 * 132,
              y = 112 - Math.floor(branch / 3) * 172;
            this.label(p, this.tr("branch." + branch), x, y + 28, 125, 28, 16, C.gold);
            var _loop5 = function _loop5() {
              var i = branch * 3 + tier;
              _this18.button(p, _this18.tr('action.level', {
                level: _this18.draft[i]
              }), x, y - 12 - tier * 39, 123, 34, function () {
                return _this18.skillNode(i);
              }, true);
            };
            for (var tier = 0; tier < 3; tier++) {
              _loop5();
            }
          }
          this.button(p, this.tr('action.revert'), -137, -285, 124, 46, function () {
            return _this18.skills();
          });
          this.button(p, this.tr('action.reset'), 0, -285, 124, 46, function () {
            _this18.draft = Array(18).fill(0);
            _this18.skills(false);
          });
          this.button(p, this.tr('action.apply'), 137, -285, 124, 46, function () {
            return _this18.act(function () {
              return _this18.game.applySkills(_this18.draft, _this18.id('skills'));
            }, function () {
              return _this18.skills();
            });
          }, true);
        };
        _proto.perks = function perks() {
          var _this19 = this;
          var p = this.open(this.tr('perks.title'), 650);
          this.label(p, this.tr('perks.info'), 0, 242, 370, 50, 16, C.muted);
          this.scroll(p, 0, -25, 400, 450, Array.from({
            length: 6
          }, function (_, i) {
            return {
              title: _this19.tr('perks.row', {
                name: _this19.tr("branch." + i),
                count: _this19.game.s.perks[i]
              }),
              sub: Date.now() < _this19.game.s.perkUntil[i] ? _this19.tr('action.remaining', {
                seconds: Math.ceil((_this19.game.s.perkUntil[i] - Date.now()) / 1000)
              }) : '',
              icon: i,
              action: _this19.tr('action.apply'),
              click: function click() {
                return _this19.act(function () {
                  return _this19.game.usePerk(i, _this19.id('perk'));
                }, function () {
                  return _this19.extensions.perks();
                });
              }
            };
          }));
        };
        _proto.mastery = function mastery() {
          this.extensions.heroMastery();
        };
        _proto.oldMastery = function oldMastery() {
          var s = this.game.s;
          this.info(this.tr('hero.mastery'), this.tr('hero.masteryInfo', {
            weapons: s.weapons.reduce(function (a, b) {
              return a + b;
            }, 0),
            scrolls: s.scrolls.reduce(function (a, b) {
              return a + b;
            }, 0)
          }));
        };
        _proto.daily = function daily() {
          var _this20 = this;
          var p = this.open(this.tr('daily.title'), 570);
          this.scroll(p, 0, -24, 400, 450, [0, 1, 2, 3].map(function (i) {
            return {
              title: _this20.tr("daily." + i),
              sub: _this20.tr('daily.progress', {
                current: _this20.game.dailyProgress(i),
                goal: _this20.game.dailyGoal(i)
              }),
              icon: i,
              tint: C.mint,
              action: _this20.tr(_this20.game.s.claims.includes("daily." + i) ? 'action.claimed' : 'action.claim'),
              click: function click() {
                return _this20.act(function () {
                  return _this20.game.claimDaily(i);
                }, function () {
                  return _this20.daily();
                });
              }
            };
          }));
        };
        _proto.milestones = function milestones() {
          var _this21 = this;
          var p = this.open(this.tr('milestone.title'), 630);
          this.scroll(p, 0, -28, 400, 514, [8, 15, 60, 100, 500, 1000, 100000, 180000].map(function (stage) {
            return {
              title: _this21.tr('hud.stage', {
                stage: stage
              }),
              sub: _this21.tr('milestone.row', {
                stage: stage
              }),
              action: _this21.tr(_this21.game.s.claims.includes("milestone." + stage) ? 'action.claimed' : 'action.claim'),
              click: function click() {
                return _this21.act(function () {
                  return _this21.game.claimMilestone(stage);
                }, function () {
                  return _this21.milestones();
                });
              }
            };
          }));
        };
        _proto.offline = function offline() {
          var _this22 = this;
          var p = this.open(this.tr('offline.title'), 380);
          this.label(p, this.tr('offline.reward', {
            gold: this.format(this.game.s.offline)
          }), 0, 40, 370, 65, 24, C.gold);
          this.label(p, this.tr('offline.info'), 0, -26, 370, 56, 17, C.muted);
          this.button(p, this.tr('action.claim'), 0, -126, 310, 50, function () {
            return _this22.act(function () {
              return _this22.game.collectOffline(_this22.id('offline'));
            }, function () {
              return _this22.close();
            });
          }, true);
        };
        _proto.online = function online() {
          this.info(this.tr('online.title'), this.tr('online.unavailable'));
        };
        _proto.profile = function profile() {
          var s = this.game.s;
          this.info(this.tr('menu.profile'), this.tr('profile.stats', {
            stage: s.maxStage,
            prestiges: s.prestiges,
            kills: s.totalKills,
            taps: s.totalTaps,
            artifacts: s.artifacts.filter(Boolean).length,
            pets: s.pets.reduce(function (a, b) {
              return a + b;
            }, 0)
          }));
        };
        _proto.settings = function settings() {
          var _this23 = this;
          var p = this.open(this.tr('menu.settings'), 700);
          this.label(p, this.tr('settings.language'), 0, 183, 340, 30, 17, C.muted);
          this.button(p, this.tr('locale.ko'), -94, 134, 175, 46, function () {
            _this23.game.s.locale = 'ko';
            _this23.game.persist();
            _this23.close();
            _this23.draw();
            _this23.settings();
          }, this.game.s.locale === 'ko');
          this.button(p, this.tr('locale.en'), 94, 134, 175, 46, function () {
            _this23.game.s.locale = 'en';
            _this23.game.persist();
            _this23.close();
            _this23.draw();
            _this23.settings();
          }, this.game.s.locale === 'en');
          this.button(p, this.tr('settings.audio', {
            state: this.tr(this.game.s.audio ? 'settings.on' : 'settings.off')
          }), 0, 60, 365, 48, function () {
            _this23.game.s.audio = !_this23.game.s.audio;
            _this23.game.persist();
            _this23.settings();
          });
          this.button(p, this.tr('settings.saveButton'), 0, -4, 365, 48, function () {
            if (_this23.game.persist()) _this23.toast(_this23.tr('settings.save'));else _this23.flushNotice();
          });
          this.button(p, this.tr('menu.title'), 0, -66, 365, 40, function () {
            return _this23.menu();
          });
          this.button(p, this.tr('complete.display'), -124, -290, 116, 48, function () {
            return _this23.extensions.displaySettings();
          });
          this.button(p, this.tr('complete.account'), 0, -290, 116, 48, function () {
            return _this23.extensions.account();
          });
          this.button(p, this.tr('complete.support'), 124, -290, 116, 48, function () {
            return _this23.extensions.support();
          });
          this.label(p, this.tr('settings.about'), 0, -132, 375, 64, 15, C.muted);
          resources.load('branding/tt-softs-ci/texture', Texture2D, function (err, texture) {
            if (err || !p.isValid) return;
            var n = _this23.nodeAt(p, 'company-ci', 0, -203, 120, 120 * texture.height / texture.width);
            var sp = n.addComponent(Sprite);
            var frame = new SpriteFrame();
            frame.texture = texture;
            sp.spriteFrame = frame;
            sp.sizeMode = Sprite.SizeMode.CUSTOM;
            n.getComponent(UITransform).setContentSize(120, 120 * texture.height / texture.width);
          });
        };
        _proto.cards = function cards() {
          var _this24 = this;
          var s = this.game.s,
            p = this.open(this.tr('menu.cards'), 720);
          this.label(p, this.tr('raid.deck', {
            a: this.tr("card." + s.deck[0]),
            b: this.tr("card." + s.deck[1]),
            c: this.tr("card." + s.deck[2])
          }), 0, 270, 385, 50, 16, C.mint);
          this.label(p, this.tr('raid.dust', {
            dust: s.dust
          }), 0, 225, 385, 26, 15, C.gold);
          this.scroll(p, 0, -47, 400, 505, CARDS.map(function (c) {
            return {
              title: _this24.tr(c.name),
              sub: _this24.tr('raid.card', {
                level: s.cards[c.id],
                fragments: s.fragments[c.id]
              }),
              icon: c.id,
              tint: [C.ember, C.violet, C.mint][c.type],
              action: _this24.tr(s.deck.includes(c.id) ? 'action.selected' : 'action.select'),
              click: function click() {
                _this24.game.setDeck(c.id);
                _this24.cardDetail(c.id);
              }
            };
          }));
        };
        _proto.cardDetail = function cardDetail(i) {
          var _this25 = this;
          var s = this.game.s,
            p = this.open(this.tr("card." + i), 490);
          this.label(p, this.tr('complete.cardProc.' + i % 3), 0, 140, 370, 85, 18);
          this.label(p, this.tr('raid.card', {
            level: s.cards[i],
            fragments: s.fragments[i]
          }), 0, 40, 360, 60, 22);
          this.button(p, this.tr('raid.upgrade', {
            cost: s.cards[i] * 10
          }), 0, -33, 360, 48, function () {
            return _this25.act(function () {
              return _this25.game.upgradeCard(i, _this25.id('card'));
            }, function () {
              return _this25.cardDetail(i);
            });
          }, true);
          this.button(p, this.tr('action.back'), 0, -112, 360, 44, function () {
            return _this25.cards();
          });
        };
        _proto.format = function format(value) {
          return fmt(value, this.game.s.extra.scientific);
        };
        _proto.raidLobby = function raidLobby() {
          this.extensions.solo();
        };
        _proto.raidView = function raidView() {
          var _this26 = this;
          var p = this.open(this.tr('raid.title'), 700),
            r = this.game.raid;
          var status = this.label(p, '', 0, 266, 375, 32, 20, C.gold);
          var parts = [];
          var _loop6 = function _loop6(i) {
            var x = i % 2 ? -94 : 94,
              y = 178 - Math.floor(i / 2) * 88;
            var b = _this26.button(p, '', x, y, 170, 70, function () {
              _this26.game.raidTap(i);
              _this26.sound(170 + i * 30);
            });
            parts.push(_this26.label(b, '', 0, 0, 156, 61, 16, C.text));
          };
          for (var i = 0; i < 8; i++) {
            _loop6(i);
          }
          var done = this.button(p, this.tr('action.claim'), 0, -243, 365, 51, function () {
            if (!r.ended) return;
            _this26.act(function () {
              return _this26.game.claimRaid(_this26.id('raid'));
            }, function () {
              return _this26.info(_this26.tr('raid.result'), _this26.tr('raid.reward', {
                damage: display(r.damage),
                dust: Math.floor(r.damage / 100)
              }));
            });
          }, true);
          this.modalRefresh = function () {
            status.string = _this26.tr('raid.damage', {
              damage: display(r.damage),
              seconds: Math.ceil(r.seconds)
            });
            parts.forEach(function (l, i) {
              return l.string = _this26.tr('raid.part', {
                part: i + 1
              }) + '\n' + display(r.hp[i] + r.armor[i]);
            });
            done.active = r.ended && !r.claimed;
          };
          this.modalRefresh();
        };
        _proto.events = function events() {
          var _this27 = this;
          var p = this.open(this.tr('event.title'), 670);
          this.label(p, this.tr('event.balance', {
            tokens: this.game.s.eventTokens
          }), 0, 246, 380, 35, 22, C.gold);
          this.label(p, this.tr('event.rule'), 0, 158, 380, 116, 17, C.muted);
          this.button(p, this.tr('event.board'), -99, 57, 182, 50, function () {
            return _this27.board();
          });
          this.button(p, this.tr('extra.eventModes'), 99, 57, 182, 50, function () {
            return _this27.extensions.eventHub();
          });
          this.scroll(p, 0, -140, 400, 270, Array.from({
            length: 10
          }, function (_, i) {
            return {
              title: _this27.tr('event.reward', {
                tokens: (i + 1) * 100
              }),
              action: _this27.tr(_this27.game.s.claims.includes("event." + i) ? 'action.claimed' : 'action.claim'),
              click: function click() {
                return _this27.act(function () {
                  return _this27.game.claimEvent(i);
                }, function () {
                  return _this27.events();
                });
              }
            };
          }));
        };
        _proto.board = function board() {
          var _this28 = this;
          var p = this.open(this.tr('event.board'), 610);
          this.label(p, this.tr('event.balance', {
            tokens: this.game.s.eventTokens
          }), 0, 215, 375, 40, 20, C.gold);
          var _loop7 = function _loop7(i) {
            var v = _this28.game.s.board[i];
            _this28.button(p, v ? _this28.tr('event.found', {
              gems: v * 5
            }) : _this28.tr('event.tile', {
              index: i + 1
            }), -147 + i % 4 * 98, 123 - Math.floor(i / 4) * 85, 88, 70, function () {
              return _this28.act(function () {
                return _this28.game.revealTile(i, _this28.id('tile'));
              }, function () {
                return _this28.board();
              });
            }, !!v);
          };
          for (var i = 0; i < 16; i++) {
            _loop7(i);
          }
          this.button(p, this.tr('action.back'), 0, -244, 365, 43, function () {
            return _this28.events();
          });
        };
        _proto.meta = function meta() {
          var _this29 = this;
          var p = this.open(this.tr('meta.title'), 540);
          [['meta.souls', function () {
            return _this29.extensions.souls();
          }], ['meta.gems', function () {
            return _this29.extensions.gems();
          }], ['meta.research', function () {
            return _this29.research();
          }], ['meta.monuments', function () {
            return _this29.extensions.monuments();
          }]].forEach(function (v, i) {
            return _this29.button(p, _this29.tr(v[0]), 0, 139 - i * 91, 372, 70, v[1]);
          });
        };
        _proto.souls = function souls() {
          var _this30 = this;
          var s = this.game.s,
            p = this.open(this.tr('meta.souls'), 440);
          this.label(p, this.tr('meta.soulInfo', {
            souls: s.souls,
            count: s.titans.filter(Boolean).length
          }), 0, 60, 380, 160, 20);
          this.button(p, this.tr('meta.summon'), 0, -105, 370, 55, function () {
            return _this30.act(function () {
              return _this30.game.summon(_this30.id('summon'));
            }, function () {
              return _this30.souls();
            });
          }, true);
        };
        _proto.stones = function stones() {
          var _this31 = this;
          var s = this.game.s,
            p = this.open(this.tr('meta.gems'), 680);
          this.label(p, this.tr('meta.gemInfo', {
            geodes: s.geodes,
            count: s.stones.filter(Boolean).length
          }), 0, 251, 375, 42, 19, C.gold);
          this.button(p, this.tr('meta.crack'), 0, 190, 375, 46, function () {
            return _this31.act(function () {
              return _this31.game.crack(_this31.id('geode'));
            }, function () {
              return _this31.stones();
            });
          }, true);
          this.scroll(p, 0, -74, 400, 440, s.stones.map(function (level, i) {
            return {
              title: _this31.tr('meta.stone', {
                index: i + 1,
                level: level
              }),
              icon: i,
              tint: C.violet
            };
          }));
        };
        _proto.research = function research() {
          var _this32 = this;
          var s = this.game.s,
            p = this.open(this.tr('meta.research'), 650);
          this.scroll(p, 0, -25, 400, 520, s.research.map(function (level, i) {
            return {
              title: _this32.tr('meta.researchNode', {
                index: i + 1,
                level: level
              }),
              action: _this32.tr('action.upgrade'),
              click: function click() {
                return _this32.act(function () {
                  return _this32.game.upgradeResearch(i, _this32.id('research'));
                }, function () {
                  return _this32.research();
                });
              }
            };
          }));
        };
        _proto.monuments = function monuments() {
          var _this33 = this;
          var s = this.game.s,
            p = this.open(this.tr('meta.monuments'), 670);
          this.label(p, this.tr('meta.monumentInfo', {
            value: this.format(s.mementos)
          }), 0, 225, 380, 80, 19, C.gold);
          this.scroll(p, 0, -66, 400, 460, s.monuments.map(function (level, i) {
            return {
              title: _this33.tr('meta.monument', {
                index: i + 1,
                level: level
              }),
              action: _this33.tr('action.upgrade'),
              icon: i,
              click: function click() {
                return _this33.act(function () {
                  return _this33.game.monument(i, _this33.id('monument'));
                }, function () {
                  return _this33.monuments();
                });
              }
            };
          }));
        };
        _proto.remote = /*#__PURE__*/function () {
          var _remote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(work) {
            var _this34 = this;
            var key;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this.remoteBusy) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  this.remoteBusy = true;
                  _context.prev = 3;
                  _context.next = 6;
                  return work();
                case 6:
                  _context.next = 12;
                  break;
                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](3);
                  key = _context.t0.message;
                  if (key === 'online.unreachable') {
                    this.confirm(this.tr('extra.retry'), this.tr(key), function () {
                      void _this34.remote(work);
                    });
                  } else this.toast(this.tr(key.startsWith('online.') || key.startsWith('error.') || key.startsWith('extra.') ? key : 'online.serverError'));
                case 12:
                  _context.prev = 12;
                  this.remoteBusy = false;
                  return _context.finish(12);
                case 15:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[3, 8, 12, 15]]);
          }));
          function remote(_x) {
            return _remote.apply(this, arguments);
          }
          return remote;
        }();
        _proto.edit = function edit(parent, x, y, w, h, placeholder) {
          this.label(parent, placeholder, x, y + h / 2 + 13, w, 18, 12, C.muted, Label.HorizontalAlign.LEFT);
          var border = this.rect(parent, x, y, w, h, C.panel, C.line);
          var n = this.nodeAt(border, 'input', 0, 0, w - 12, h - 8);
          n.active = false;
          var field = n.addComponent(EditBox);
          field.textLabel = this.label(n, '', 0, 0, w - 20, h - 10, 18, C.text, Label.HorizontalAlign.LEFT);
          field.placeholderLabel = this.label(n, placeholder, 0, 0, w - 20, h - 10, 16, C.muted, Label.HorizontalAlign.LEFT);
          field.maxLength = 240;
          field.inputMode = EditBox.InputMode.SINGLE_LINE;
          field.placeholder = placeholder;
          n.active = true;
          return field;
        };
        _proto.guild = function guild() {
          var _this35 = this;
          void this.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
            var boot, guilds, _p, name, data, p, message;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return _this35.onlineService.connect(_this35.tr('online.defaultName'));
                case 2:
                  boot = _context5.sent;
                  if (boot.membership) {
                    _context5.next = 13;
                    break;
                  }
                  _context5.next = 6;
                  return _this35.onlineService.request('/guilds');
                case 6:
                  guilds = _context5.sent;
                  _p = _this35.open(_this35.tr('menu.clan'), 690);
                  name = _this35.edit(_p, 0, 230, 375, 48, _this35.tr('online.guildName'));
                  name.maxLength = 24;
                  _this35.button(_p, _this35.tr('online.create'), 0, 163, 375, 46, function () {
                    var value = name.string;
                    void _this35.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return _this35.onlineService.command('/guild/create', {
                              name: value
                            });
                          case 2:
                            _this35.remoteBusy = false;
                            _this35.guild();
                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }, _callee2);
                    })));
                  }, true);
                  _this35.scroll(_p, 0, -80, 400, 400, guilds.map(function (g) {
                    return {
                      title: g.name,
                      sub: _this35.tr('online.members', {
                        count: g.members
                      }),
                      action: _this35.tr('online.join'),
                      click: function click() {
                        return _this35.extensions.joinGuild(g.id, g.name);
                      }
                    };
                  }));
                  return _context5.abrupt("return");
                case 13:
                  _context5.next = 15;
                  return _this35.onlineService.request('/guild');
                case 15:
                  data = _context5.sent;
                  p = _this35.open(data.guild.name, 710);
                  _this35.label(p, _this35.tr('online.members', {
                    count: data.members.length
                  }), -60, 271, 250, 30, 18, C.gold);
                  _this35.button(p, '⋯', 164, 271, 55, 34, function () {
                    return _this35.extensions.guildTools();
                  });
                  _this35.button(p, _this35.tr('online.roster'), -101, 221, 185, 43, function () {
                    return _this35.guildMembers(data);
                  });
                  _this35.button(p, _this35.tr('online.guildRaid'), 101, 221, 185, 43, function () {
                    return _this35.guildRaid(data);
                  });
                  _this35.scroll(p, 0, 10, 400, 355, data.messages.map(function (m) {
                    return {
                      title: m.name,
                      sub: /^\[sticker:[0-5]\]$/.test(m.body) ? _this35.tr('extra.sticker.' + m.body[9]) : m.body
                    };
                  }));
                  message = _this35.edit(p, -35, -216, 303, 46, _this35.tr('online.message'));
                  _this35.button(p, _this35.tr('online.send'), 161, -216, 70, 46, function () {
                    var value = message.string;
                    void _this35.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                        while (1) switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this35.onlineService.command('/guild/chat', {
                              body: value
                            });
                          case 2:
                            _this35.remoteBusy = false;
                            _this35.guild();
                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }, _callee3);
                    })));
                  }, true);
                  _this35.button(p, _this35.tr('online.refresh'), -101, -281, 185, 44, function () {
                    return _this35.guild();
                  });
                  _this35.button(p, _this35.tr('online.leave'), 101, -281, 185, 44, function () {
                    return _this35.confirm(_this35.tr('online.leave'), _this35.tr('online.leaveConfirm'), function () {
                      void _this35.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                          while (1) switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return _this35.onlineService.command('/guild/leave');
                            case 2:
                              _this35.remoteBusy = false;
                              _this35.guild();
                            case 4:
                            case "end":
                              return _context4.stop();
                          }
                        }, _callee4);
                      })));
                    });
                  });
                case 26:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          })));
        };
        _proto.guildMembers = function guildMembers(data) {
          var _this36 = this;
          var p = this.open(this.tr('online.roster'), 650);
          this.scroll(p, 0, -28, 400, 520, data.members.map(function (m) {
            return {
              title: m.name,
              detail: function detail() {
                return _this36.extensions.member(m.id);
              },
              sub: _this36.tr(m.role === 'leader' ? 'online.leader' : 'online.member'),
              action: data.role === 'leader' && m.id !== _this36.onlineService.accountId ? _this36.tr('action.details') : undefined,
              click: function click() {
                if (data.role !== 'leader' || m.id === _this36.onlineService.accountId) return;
                var box = _this36.open(m.name, 350);
                ['transfer', 'kick'].forEach(function (action, i) {
                  return _this36.button(box, _this36.tr("online." + action), 0, 30 - i * 86, 360, 55, function () {
                    return _this36.confirm(_this36.tr("online." + action), m.name, function () {
                      void _this36.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
                        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                          while (1) switch (_context6.prev = _context6.next) {
                            case 0:
                              _context6.next = 2;
                              return _this36.onlineService.command('/guild/role', {
                                target: m.id,
                                action: action
                              });
                            case 2:
                              _this36.remoteBusy = false;
                              _this36.guild();
                            case 4:
                            case "end":
                              return _context6.stop();
                          }
                        }, _callee6);
                      })));
                    });
                  });
                });
              }
            };
          }));
        };
        _proto.guildRaid = function guildRaid(data) {
          var _this37 = this;
          var p = this.open(this.tr('online.guildRaid'), 440);
          this.label(p, this.tr('online.guildHP', {
            hp: display(data.guild.raid_hp)
          }), 0, 90, 380, 60, 24, C.ember);
          this.label(p, this.tr('online.guildRaidInfo'), 0, 9, 380, 90, 18, C.muted);
          this.button(p, this.tr('action.attack'), 0, -124, 370, 55, function () {
            _this37.extensions.guildBattle();
          }, true);
        };
        _proto.competition = function competition() {
          this.extensions.tournaments();
        };
        _proto.competitionBattle = function competitionBattle(state) {
          var _this38 = this;
          var p = this.open(this.tr(this.competitionId < 0 ? 'complete.regular' : 'online.abyss'), 680);
          this.label(p, this.tr('hud.stage', {
            stage: state.run.stage
          }), 0, 247, 380, 45, 28, C.gold);
          this.label(p, this.tr('hud.gold', {
            value: this.format(state.run.gold)
          }), 0, 196, 375, 30, 19, C.gold);
          this.label(p, this.format(state.run.hp), 0, 145, 375, 30, 18, C.ember);
          var command = function command(action, hero) {
            if (hero === void 0) {
              hero = -1;
            }
            void _this38.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
              var result;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return _this38.onlineService.command('/competition/action', {
                      id: _this38.competitionId,
                      action: action,
                      hero: hero
                    });
                  case 2:
                    result = _context7.sent;
                    _this38.competitionBattle(result.state);
                  case 4:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            })));
          };
          this.button(p, this.tr('action.attack'), 0, 50, 375, 120, function () {
            return command('tap');
          }, true);
          this.button(p, this.tr('extra.abyssShop'), 0, -203, 375, 44, function () {
            return command('shop');
          });
          this.button(p, this.tr('online.upgradeMaster', {
            level: state.run.master
          }), 0, -70, 375, 50, function () {
            return command('upgrade');
          });
          this.button(p, this.tr('nav.heroes'), -100, -140, 180, 50, function () {
            return command('upgrade', 0);
          });
          this.button(p, this.tr(state.run.boss ? 'battle.leave' : 'battle.fight'), 100, -140, 180, 50, function () {
            return command('boss');
          });
          this.button(p, this.tr('online.backMain'), 0, -270, 375, 50, function () {
            _this38.close();
            _this38.drawPanel();
          });
        };
        _proto.spells = function spells(slot) {
          var _this39 = this;
          if (slot === void 0) {
            slot = 0;
          }
          var s = this.game.s,
            p = this.open(this.tr('spell.title'), 715);
          var _loop8 = function _loop8(j) {
            _this39.button(p, String(j + 1), -165 + j * 66, 260, 60, 40, function () {
              return _this39.spells(j);
            }, j === slot);
          };
          for (var j = 0; j < 6; j++) {
            _loop8(j);
          }
          this.scroll(p, 0, -24, 400, 490, SPELLS.map(function (c) {
            return {
              title: _this39.tr("spell." + c.id),
              sub: _this39.tr('spell.detail', {
                level: s.run.spellLevels[c.id],
                unlock: c.unlock,
                mana: c.mana
              }),
              icon: c.id,
              tint: C.violet,
              action: _this39.tr(s.spellSlots.includes(c.id) ? 'action.details' : 'action.select'),
              click: function click() {
                if (s.spellSlots.includes(c.id)) {
                  var box = _this39.open(_this39.tr("spell." + c.id), 400);
                  _this39.label(box, _this39.tr('spell.detail', {
                    level: s.run.spellLevels[c.id],
                    unlock: c.unlock,
                    mana: c.mana
                  }), 0, 70, 375, 70, 20);
                  _this39.label(box, _this39.tr('spell.multicast'), 0, 0, 375, 60, 16, C.muted);
                  _this39.button(box, _this39.tr('action.upgrade'), 0, -106, 360, 50, function () {
                    if (_this39.game.upgradeSpell(c.id)) {
                      _this39.close();
                      _this39.drawPanel();
                      _this39.spells(slot);
                    } else _this39.flushNotice();
                  }, true);
                } else _this39.confirm(_this39.tr('spell.title'), _this39.tr('spell.swap'), function () {
                  if (_this39.game.selectSpell(slot, c.id)) {
                    _this39.close();
                    _this39.draw();
                    _this39.spells(slot);
                  } else _this39.flushNotice();
                });
              }
            };
          }));
        };
        _proto.skillNode = function skillNode(i) {
          var _this40 = this;
          var p = this.open(this.tr('skills.node', {
            branch: this.tr("branch." + Math.floor(i / 3)),
            tier: i % 3 + 1,
            level: this.draft[i]
          }), 400);
          this.label(p, this.tr('skills.info'), 0, 50, 372, 126, 17, C.muted);
          this.button(p, '−', -90, -57, 160, 54, function () {
            _this40.draft[i] = Math.max(0, _this40.draft[i] - 1);
            _this40.skillNode(i);
          });
          this.button(p, '+', 90, -57, 160, 54, function () {
            _this40.draft[i] = Math.min(SKILLS[i].max, _this40.draft[i] + 1);
            _this40.skillNode(i);
          }, true);
          this.button(p, this.tr('action.back'), 0, -132, 350, 44, function () {
            return _this40.skills(false);
          });
        };
        _proto.artifactDetail = function artifactDetail(i) {
          var _this41 = this;
          var s = this.game.s,
            p = this.open(this.tr("artifact." + i), 550);
          this.glyph(p, 0, 153, i, C.violet);
          this.label(p, this.tr('artifact.stats', {
            level: s.artifacts[i],
            effect: this.tr("effect." + i % 4)
          }), 0, 96, 380, 50, 20);
          this.button(p, this.tr('artifact.cost', {
            cost: this.format(this.game.artifactCost(i))
          }), 0, 23, 375, 50, function () {
            return _this41.act(function () {
              return _this41.game.upgradeArtifact(i, _this41.id('artifact'));
            }, function () {
              _this41.drawPanel();
              _this41.artifactDetail(i);
            });
          }, true);
          this.button(p, this.tr('artifact.salvage'), 0, -50, 375, 50, function () {
            return _this41.confirm(_this41.tr('artifact.salvage'), _this41.tr('artifact.salvageInfo'), function () {
              return _this41.act(function () {
                return _this41.game.salvageArtifact(i, _this41.id('salvage'));
              }, function () {
                _this41.close();
                _this41.drawPanel();
              });
            });
          });
          this.button(p, this.tr('artifact.enchant'), 0, -123, 375, 50, function () {
            return _this41.act(function () {
              return _this41.game.enchantArtifact(i, _this41.id('enchant'));
            }, function () {
              return _this41.artifactDetail(i);
            });
          });
          this.label(p, this.tr('artifact.enchantInfo'), 0, -200, 375, 60, 14, C.muted);
        };
        _proto.salvaged = function salvaged() {
          var _this42 = this;
          var p = this.open(this.tr('artifact.salvaged'), 600);
          this.scroll(p, 0, -24, 400, 480, this.game.s.salvaged.map(function (i) {
            return {
              title: _this42.tr("artifact." + i),
              sub: _this42.tr('artifact.rebuyInfo'),
              icon: i,
              action: _this42.tr('action.buy'),
              click: function click() {
                return _this42.act(function () {
                  return _this42.game.rebuyArtifact(i, _this42.id('rebuy'));
                }, function () {
                  _this42.drawPanel();
                  _this42.salvaged();
                });
              }
            };
          }));
        };
        _proto.equipmentTools = function equipmentTools() {
          var _this43 = this;
          var p = this.open(this.tr('nav.equipment'), 460);
          [['equipment.sets', function () {
            return _this43.sets();
          }], ['equipment.bulk', function () {
            return _this43.confirm(_this43.tr('equipment.bulk'), _this43.tr('equipment.bulkInfo'), function () {
              return _this43.act(function () {
                return _this43.game.sell(_this43.game.s.equipment.filter(function (e) {
                  return !e.locked && !_this43.game.s.equipped.includes(e.id);
                }).map(function (e) {
                  return e.id;
                }), _this43.id('bulk'));
              }, function () {
                _this43.close();
                _this43.drawPanel();
              });
            });
          }], ['equipment.transmog', function () {
            return _this43.transmog();
          }]].forEach(function (v, i) {
            return _this43.button(p, _this43.tr(v[0]), 0, 114 - i * 96, 375, 60, v[1]);
          });
        };
        _proto.transmog = function transmog() {
          var _this44 = this;
          var p = this.open(this.tr('equipment.transmog'), 650);
          this.scroll(p, 0, -24, 400, 520, this.game.s.equipment.map(function (e) {
            return {
              title: _this44.itemName(e),
              icon: e.slot,
              action: _this44.tr('action.apply'),
              click: function click() {
                return _this44.act(function () {
                  return _this44.game.transmog(e.slot, e.id, _this44.id('transmog'));
                }, function () {
                  _this44.close();
                  _this44.draw();
                });
              }
            };
          }));
        };
        _proto.achievements = function achievements() {
          var _this45 = this;
          var p = this.open(this.tr('achievement.title'), 570);
          this.scroll(p, 0, -24, 400, 450, [0, 1, 2, 3].map(function (i) {
            return {
              title: _this45.tr("achievement." + i),
              sub: _this45.tr('daily.progress', {
                current: _this45.game.achievementProgress(i),
                goal: _this45.game.achievementGoal(i)
              }),
              icon: i,
              tint: C.gold,
              action: _this45.tr('action.claim'),
              click: function click() {
                return _this45.act(function () {
                  return _this45.game.claimAchievement(i, _this45.id('achievement'));
                }, function () {
                  return _this45.achievements();
                });
              }
            };
          }));
        };
        _proto.globalRaid = function globalRaid() {
          var _this46 = this;
          void this.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
            var data;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return _this46.onlineService.connect(_this46.tr('online.defaultName'));
                case 2:
                  _context8.next = 4;
                  return _this46.onlineService.request('/global');
                case 4:
                  data = _context8.sent;
                  _this46.globalRaidPanel(data);
                case 6:
                case "end":
                  return _context8.stop();
              }
            }, _callee8);
          })));
        };
        _proto.globalRaidPanel = function globalRaidPanel(data) {
          var _this47 = this;
          var p = this.open(this.tr('extra.globalRaid'), 450);
          this.label(p, this.tr('online.guildHP', {
            hp: display(data.hp)
          }), 0, 90, 375, 70, 24);
          this.button(p, this.tr('action.attack'), 0, -65, 375, 60, function () {
            void _this47.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
              var next;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return _this47.onlineService.command('/global/attack');
                  case 2:
                    next = _context9.sent;
                    _this47.globalRaidPanel(next);
                  case 4:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            })));
          }, true);
        };
        _proto.eventRanks = function eventRanks() {
          var _this48 = this;
          void this.remote( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
            var rows, p;
            return _regeneratorRuntime().wrap(function _callee10$(_context10) {
              while (1) switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return _this48.onlineService.connect(_this48.tr('online.defaultName'));
                case 2:
                  _context10.next = 4;
                  return _this48.onlineService.request('/global/ranks');
                case 4:
                  rows = _context10.sent;
                  p = _this48.open(_this48.tr('extra.eventRanks'), 660);
                  _this48.scroll(p, 0, -25, 400, 530, rows.map(function (r, i) {
                    return {
                      title: _this48.tr('online.rank', {
                        rank: i + 1,
                        name: r.name
                      }),
                      sub: _this48.tr('extra.contribution', {
                        value: r.damage
                      })
                    };
                  }));
                case 7:
                case "end":
                  return _context10.stop();
              }
            }, _callee10);
          })));
        };
        _proto.updateHUD = function updateHUD() {
          var _this49 = this;
          var g = this.game,
            r = g.s.run;
          this.equipmentPile.active = g.s.extra.unseenEquipment.length > 0;
          this.equipmentPile.getComponentInChildren(Label).string = this.tr('complete.pile', {
            count: g.s.extra.unseenEquipment.length
          });
          this.fairy.active = Date.now() >= g.s.fairyAt;
          this.stageLabel.string = String(r.stage);
          this.stageNeighbors.forEach(function (l, i) {
            return l.string = String(Math.max(1, r.stage + (i ? 1 : -1)));
          });
          this.enemyLabel.string = this.tr(r.boss ? 'hud.boss' : 'art.enemy.' + this.game.s.totalKills % 3);
          this.goldLabel.string = this.format(r.gold);
          this.gemsLabel.string = this.format(r.gold);
          this.damageLabel.string = this.tr('layout.tapDamage', {
            value: this.format(g.tapDamage())
          });
          this.manaLabel.string = this.tr('hud.mana', {
            value: Math.floor(r.mana)
          });
          this.hpFill.setScale(this.enemyTransition > .2 ? 0 : Math.max(.001, ratio(r.hp, g.maxHP())), 1, 1);
          this.hpLabel.string = this.enemyTransition > .2 ? this.tr('battle.defeated') : this.format(r.hp);
          this.progressLabel.string = this.tr(r.boss ? 'hud.timer' : 'hud.progress', {
            seconds: Math.ceil(r.bossLeft),
            count: r.kills
          });
          this.bossButton.active = r.kills >= 5;
          var l = this.bossButton.getComponentInChildren(Label);
          if (l) l.string = this.tr(r.boss ? 'battle.leave' : 'battle.fight');
          this.spellLabels.forEach(function (l, slot) {
            var i = g.s.spellSlots[slot];
            l.string = r.master < SPELLS[i].unlock ? _this49.tr('action.level', {
              level: SPELLS[i].unlock
            }) : r.cooldowns[i] > 0 ? _this49.tr('action.remaining', {
              seconds: Math.ceil(r.cooldowns[i])
            }) : _this49.tr("spell." + i);
          });
        };
        _proto.attack = function attack() {
          if (this.enemyTransition > 0) return;
          if (!this.game.s.extra.effects) {
            this.game.tap();
            this.syncEnemyDeath();
            this.sound(180);
            return;
          }
          Tween.stopAllByTarget(this.actor);
          this.actor.angle = -9;
          tween(this.actor).to(.16, {
            angle: 7
          }).to(.14, {
            angle: 0
          }).start();
          var slash = this.nodeAt(this.particles, 'slash', 0, 120, 160, 100),
            line = slash.addComponent(Graphics);
          line.strokeColor = this.color(C.gold);
          line.lineWidth = 6;
          line.moveTo(-65, -30);
          line.lineTo(10, 20);
          line.lineTo(65, 40);
          line.stroke();
          tween(slash).delay(.12).call(function () {
            return slash.destroy();
          }).start();
          var damage = this.game.tap();
          this.sound(170 + Math.random() * 50);
          var n = this.label(this.particles, this.format(damage), (Math.random() - .5) * 110, 135, 180, 40, 25, C.gold).node;
          n.addComponent(UIOpacity);
          tween(n).by(.6, {
            position: new Vec3(0, 70, 0)
          }).call(function () {
            return n.destroy();
          }).start();
          this.spark(0, 135, C.gold);
          this.enemy.setPosition(4, 95);
          tween(this.enemy).to(.08, {
            position: new Vec3(0, 95, 0)
          }).start();
          this.syncEnemyDeath();
          this.updateHUD();
        };
        _proto.spark = function spark(x, y, color) {
          var _this50 = this;
          var _loop9 = function _loop9() {
            var n = _this50.rect(_this50.particles, x, y, 5, 5, color);
            tween(n).by(.25, {
              position: new Vec3((Math.random() - .5) * 105, (Math.random() - .5) * 95, 0)
            }).call(function () {
              return n.destroy();
            }).start();
          };
          for (var i = 0; i < 5; i++) {
            _loop9();
          }
        };
        _proto.sound = function sound(frequency) {
          if (!this.game.s.audio) return;
          try {
            var w = globalThis;
            var A = w.AudioContext || w.webkitAudioContext;
            if (!A) return;
            if (!this.audioContext) this.audioContext = new A();
            var ctx = this.audioContext;
            if (ctx.state === 'suspended') void ctx.resume();
            var o = ctx.createOscillator(),
              gain = ctx.createGain();
            o.type = 'triangle';
            o.frequency.setValueAtTime(frequency, ctx.currentTime);
            o.frequency.exponentialRampToValueAtTime(frequency * .55, ctx.currentTime + .075);
            gain.gain.setValueAtTime(.035, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .09);
            o.connect(gain);
            gain.connect(ctx.destination);
            o.start();
            o.stop(ctx.currentTime + .1);
          } catch (_unused) {}
        };
        _proto.toast = function toast(text) {
          var _this51 = this;
          if (this.toastNode) {
            this.toastNode.removeFromParent();
            this.toastNode.destroy();
          }
          var n = this.rect(this.root, 0, -345, 434, 50, '#334754', C.gold);
          this.toastNode = n;
          this.label(n, text, 0, 0, 410, 43, 16, C.text);
          tween(n).delay(2.2).call(function () {
            if (n.isValid) n.destroy();
            if (_this51.toastNode === n) _this51.toastNode = null;
          }).start();
        };
        _proto.flushNotice = function flushNotice() {
          if (!this.modal && this.game.s.extra.unlockNotices.length) {
            var stage = this.game.s.extra.unlockNotices.shift();
            this.game.persist();
            this.info(this.tr('complete.unlocked'), this.tr('complete.unlock.' + stage));
            return;
          }
          if (!this.modal && this.game.s.extra.rewardNotices.length) {
            var reward = this.game.s.extra.rewardNotices.shift();
            this.game.persist();
            this.info(this.tr('reward.done'), this.tr('complete.reward.' + reward.kind, {
              value: reward.value,
              count: reward.count,
              hero: ['weapon', 'scroll'].includes(reward.kind) ? this.tr('hero.' + reward.value) : ''
            }));
            return;
          }
          if (this.game.notice) {
            this.toast(this.tr(this.game.notice));
            this.game.notice = '';
          }
        };
        _proto.update = function update(dt) {
          if (!this.game) return;
          if (this.particles) this.particles.active = this.game.s.extra.effects;
          if (this.enemyTransition > 0) {
            var old = this.enemyTransition;
            this.enemyTransition = Math.max(0, old - dt);
            this.game.tick(0);
            if (old > .2 && this.enemyTransition <= .2) this.spawnEnemy();
          } else {
            this.game.tick(dt);
            this.syncEnemyDeath();
          }
          if (!this.enemyTransition) {
            var look = this.enemyKey();
            if (this.enemyLook !== look) this.spawnEnemy();
            this.enemy.setScale(1 + Math.sin(this.age * 2) * .014, 1 + Math.sin(this.age * 2) * .014, 1);
          }
          if (this.worldKey !== Math.floor((this.game.s.run.stage - 1) / 25) % 4) this.world();
          this.age += dt;
          this.refresh += dt;
          this.saveClock += dt;
          this.actor.setPosition(-8, 0 + Math.sin(this.age * 3) * 1.4);
          this.syncAllies();
          this.allyClock += dt;
          if (this.allyClock >= 1.15) {
            this.allyClock = 0;
            if (!this.enemyTransition) this.animateAlly();
          }
          if (this.refresh > .15) {
            this.refresh = 0;
            this.updateHUD();
            if (this.modalRefresh) this.modalRefresh();
            this.flushNotice();
          }
          if (this.saveClock >= 5) {
            this.saveClock = 0;
            this.extensions.notifyReady();
            this.game.persist();
          }
        };
        return GameApp;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/I18n.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('t', t);
      cclegacy._RF.push({}, "9c118ZtT3FGL5qHjAdIxvn+", "I18n", undefined);
      var translations = exports('translations', {
        ko: {
          'locale.ko': '한국어',
          'locale.en': 'English',
          'game.name': '잿불의 탑',
          'game.subtitle': '끝없는 원정',
          'game.local': '오프라인 원정',
          'nav.master': '수호자',
          'nav.heroes': '동료',
          'nav.equipment': '장비',
          'nav.pets': '정령',
          'nav.artifacts': '유물',
          'nav.shop': '상점',
          'hud.stage': '구역 {stage}',
          'hud.zone': '{zone} · 잿빛 능선',
          'hud.gold': '골드 {value}',
          'hud.gems': '보석 {value}',
          'hud.damage': '탭 {tap}  /  초당 {dps}',
          'hud.mana': '마나 {value} / 120',
          'hud.enemy': '황혼의 파수병',
          'hud.boss': '거대 수문장',
          'hud.progress': '처치 {count} / 5',
          'hud.timer': '보스 {seconds}초',
          'hud.tap': '화면을 탭하여 공격',
          'hud.max': '최고 구역 {stage}',
          'action.close': '닫기',
          'action.cancel': '취소',
          'action.confirm': '확인',
          'action.buy': '구매',
          'action.upgrade': '강화',
          'action.equip': '장착',
          'action.equipped': '장착 중',
          'action.sell': '판매',
          'action.lock': '잠금 전환',
          'action.claim': '수령',
          'action.claimed': '수령 완료',
          'action.open': '열기',
          'action.apply': '적용',
          'action.revert': '되돌리기',
          'action.reset': '초기화',
          'action.next': '다음',
          'action.previous': '이전',
          'action.back': '뒤로',
          'action.ready': '준비 완료',
          'action.max': '최대',
          'action.level': '레벨 {level}',
          'action.cost': '비용 {cost}',
          'action.buyLevel': '+{count} · {cost}',
          'action.details': '상세',
          'action.remaining': '{seconds}초 남음',
          'action.selected': '선택됨',
          'action.select': '선택',
          'action.attack': '공격',
          'master.title': '잿불 수호자',
          'master.desc': '검을 강화하고 더 높은 구역에 도전하세요.',
          'master.level': '레벨 {level} · 탭 피해 {damage}',
          'master.buyMode': '구매 단위 ×{count}',
          'master.skills': '특성',
          'master.perks': '축복',
          'master.prestige': '환생',
          'prestige.title': '불씨를 이어받다',
          'prestige.desc': '현재 구역, 골드, 수호자와 동료 레벨이 초기화됩니다. 장비·정령·유물·특성은 유지됩니다.',
          'prestige.reward': '기억 조각 +{value}',
          'prestige.start': '다음 원정 시작 구역 {stage}',
          'prestige.locked': '구역 60에서 환생 해금',
          'prestige.done': '환생 완료. 새로운 원정을 시작합니다.',
          'hero.stats': '레벨 {level} · 초당 {damage}',
          'hero.locked': '구역 {stage}에서 해금',
          'hero.title': '원정대',
          'hero.mastery': '무기와 두루마리',
          'hero.masteryInfo': '무기 {weapons} · 두루마리 {scrolls}\n동료의 영구 피해 배율을 높입니다.',
          'equipment.title': '장비 보관함',
          'equipment.summary': '조각 {shards} · 보관 {count}/100',
          'equipment.craft': '세트 제작',
          'equipment.sets': '수집 세트',
          'equipment.item': '{slot} · {rarity} +{level}',
          'equipment.power': '모든 피해 ×{power}',
          'equipment.compare': '현재 ×{current} → 선택 ×{next}',
          'equipment.sellConfirm': '이 장비를 판매하고 보석을 받습니다. 판매한 장비는 되돌릴 수 없습니다.',
          'equipment.craftDesc': '아직 제작하지 않은 다음 부위를 획득합니다.\n필요 조각 {cost} · 현재 {shards}',
          'equipment.setInfo': '수집 {count}개 · 완성 {sets}세트\n누적 제작 소비 {spent}\n세트 획득 이력은 판매해도 유지됩니다.',
          'equipment.empty': '구역 15부터 장비가 드롭됩니다.',
          'equipment.protected': '잠금 또는 장착 중',
          'pet.title': '정령의 쉼터',
          'pet.hatch': '알 부화',
          'pet.bonus': '레벨 {level} · {bonus} 보너스',
          'pet.locked': '구역 8에서 정령 해금',
          'pet.info': '장착한 정령은 효과 100% 적용. 비장착 정령은 레벨에 따라 최대 100% 적용됩니다.',
          'artifact.title': '잊힌 유물',
          'artifact.balance': '기억 조각 {value}',
          'artifact.discover': '유물 발견 · {cost}',
          'artifact.stats': '레벨 {level} · {effect}',
          'artifact.empty': '환생으로 기억 조각을 얻어 유물을 발견하세요.',
          'artifact.cost': '강화 · {cost}',
          'shop.regular': '일반',
          'shop.progression': '성장',
          'shop.limited': '기간 한정',
          'shop.pet': '정령 3레벨',
          'shop.shards': '제작 조각 10개',
          'shop.chest': '원정 보급함',
          'shop.chestInfo': '제작 조각 10개, 보석 원석 1개, 무기 1개를 받습니다.',
          'shop.confirm': '보석 {cost}개를 사용합니다.',
          'shop.free': '일일 무료 보석',
          'shop.unavailable': '결제 상품은 스토어 연결 후 이용할 수 있습니다.',
          'shop.locked': '조건 달성 후 수령할 수 있습니다.',
          'skills.title': '특성 수련',
          'skills.points': '남은 포인트 {points} · 임시 비용 {cost}',
          'skills.node': '{branch} {tier} · Lv {level}',
          'skills.info': '다음 단계는 앞 노드 3레벨 필요. 레벨별 비용은 1, 2, 3…이며 적용 전까지 전투에 반영되지 않습니다.',
          'skills.resetConfirm': '모든 특성을 초기화하고 사용한 포인트를 돌려받습니다.',
          'perks.title': '원정의 축복',
          'perks.row': '{name} · 보유 {count}',
          'perks.info': '5분 동안 관련 성장 배율을 높입니다.',
          'daily.title': '일일 임무',
          'daily.progress': '{current} / {goal}',
          'daily.0': '오늘의 출석',
          'daily.1': '100회 탭하기',
          'daily.2': '적 50마리 처치',
          'daily.3': '한 번 환생하기',
          'daily.reward': '보석 +{gems}',
          'milestone.title': '원정 이정표',
          'milestone.row': '최고 구역 {stage} · 보석 25 / 조각 5',
          'inbox.title': '보관 우편',
          'inbox.empty': '새로운 우편이 없습니다.',
          'offline.title': '다시 돌아온 원정대',
          'offline.reward': '비접속 골드 {gold}',
          'offline.info': '최대 8시간의 비접속 보상을 수령하세요.',
          'menu.title': '원정 기록',
          'menu.daily': '일일 임무',
          'menu.milestones': '이정표',
          'menu.raid': '솔로 레이드',
          'menu.cards': '레이드 카드',
          'menu.event': '잿불 축제',
          'menu.meta': '심화 성장',
          'menu.clan': '길드',
          'menu.tournament': '대회',
          'menu.profile': '프로필',
          'menu.settings': '설정',
          'menu.inbox': '우편',
          'online.title': '온라인 서비스',
          'online.unavailable': '이 빌드는 로컬 저장으로 플레이합니다. 실제 길드·채팅·대회 매칭은 서버 연결이 필요합니다.',
          'profile.stats': '최고 구역 {stage}\n환생 {prestiges}회\n누적 처치 {kills}\n누적 탭 {taps}\n유물 {artifacts}개\n정령 총레벨 {pets}',
          'settings.language': '언어',
          'settings.audio': '효과음 {state}',
          'settings.on': '켜짐',
          'settings.off': '꺼짐',
          'settings.about': 'Cocos Creator 3.8.8 · v0.1.0\nTTSofts · 독립 레트로 방치형 RPG',
          'settings.save': '저장 완료',
          'settings.saveButton': '지금 저장',
          'settings.export': '저장 데이터 내보내기',
          'raid.title': '균열 레이드',
          'raid.portal': '관문 {portal}',
          'raid.desc': '카드 3장을 선택하고 30초 동안 부위를 탭하세요. 파괴한 부위는 다시 공격할 수 없습니다.',
          'raid.locked': '최고 구역 100에서 레이드 해금',
          'raid.damage': '총 피해 {damage} · {seconds}초',
          'raid.result': '레이드 결과',
          'raid.reward': '피해 {damage}\n정수 +{dust}\n사용한 카드 조각 각 1개',
          'raid.part': '부위 {part}',
          'raid.deck': '카드 덱 {a} / {b} / {c}',
          'raid.upgrade': '강화 · 정수 {cost}',
          'raid.card': '레벨 {level} · 조각 {fragments}',
          'raid.dust': '정수 {dust}',
          'event.title': '잿불 축제',
          'event.balance': '축제 토큰 {tokens}',
          'event.path': '보상 여정',
          'event.board': '유적 탐사',
          'event.rule': '적을 처치해 토큰을 얻으세요. 보상 여정은 시즌 누적 획득량 조건이며, 탐사는 칸마다 토큰 20개를 사용합니다.',
          'event.reward': '토큰 {tokens} · 보석 15 / 조각 5',
          'event.tile': '탐사 {index}',
          'event.found': '보석 +{gems}',
          'meta.title': '심화 성장',
          'meta.souls': '영혼 수집',
          'meta.gems': '별빛 보석',
          'meta.monuments': '기념비',
          'meta.research': '영혼 연구',
          'meta.soulInfo': '영혼 {souls} · 수집 {count}/120\n최고 구역 100,000 또는 계정 30일에 해금.',
          'meta.summon': '소환 · 영혼 10',
          'meta.gemInfo': '보석 원석 {geodes} · 수집 {count}/24',
          'meta.crack': '원석 열기',
          'meta.stone': '별빛 보석 {index} · Lv {level}',
          'meta.monumentInfo': '최고 구역 180,000에서 해금\n시즌 기억 {value}',
          'meta.monument': '기념비 {index} · Lv {level}',
          'meta.researchNode': '연구 {index} · Lv {level}',
          'error.currency': '재화가 부족합니다.',
          'error.locked': '아직 해금되지 않았습니다.',
          'error.mana': '마나가 부족하거나 재사용 대기 중입니다.',
          'error.full': '장비 보관함이 가득 찼습니다.',
          'error.complete': '모두 수집했습니다.',
          'error.invalid': '유효하지 않은 요청입니다.',
          'error.prerequisite': '선행 특성을 먼저 올려주세요.',
          'error.protected': '잠금 또는 장착 중인 장비는 판매할 수 없습니다.',
          'error.timer': '아직 준비되지 않았습니다.',
          'error.claimed': '이미 수령했거나 조건을 충족하지 못했습니다.',
          'error.save': '저장 데이터를 읽지 못했습니다. 원본 데이터는 보관해 주세요.',
          'error.storage': '저장 공간에 접근할 수 없습니다.',
          'battle.failed': '시간 초과. 강화 후 보스에 다시 도전하세요.',
          'battle.fight': '보스 도전',
          'battle.leave': '보스 이탈',
          'unlock.pet': '정령 동행이 해금되었습니다.',
          'reward.done': '보상을 받았습니다.',
          'fairy.title': '길잡이의 선물',
          'fairy.reward': '원정 골드를 받았습니다.',
          'empty': '아직 획득한 항목이 없습니다.'
        },
        en: {
          'locale.ko': '한국어',
          'locale.en': 'English',
          'game.name': 'EMBER ASCENT',
          'game.subtitle': 'THE ENDLESS EXPEDITION',
          'game.local': 'OFFLINE EXPEDITION',
          'nav.master': 'Guardian',
          'nav.heroes': 'Heroes',
          'nav.equipment': 'Gear',
          'nav.pets': 'Spirits',
          'nav.artifacts': 'Relics',
          'nav.shop': 'Shop',
          'hud.stage': 'STAGE {stage}',
          'hud.zone': '{zone} · ASHEN RIDGE',
          'hud.gold': 'Gold {value}',
          'hud.gems': 'Gems {value}',
          'hud.damage': 'Tap {tap}  /  DPS {dps}',
          'hud.mana': 'Mana {value} / 120',
          'hud.enemy': 'Dusk Sentinel',
          'hud.boss': 'Great Gatekeeper',
          'hud.progress': 'Defeated {count} / 5',
          'hud.timer': 'Boss {seconds}s',
          'hud.tap': 'TAP THE FIELD TO ATTACK',
          'hud.max': 'Best stage {stage}',
          'action.close': 'Close',
          'action.cancel': 'Cancel',
          'action.confirm': 'Confirm',
          'action.buy': 'Buy',
          'action.upgrade': 'Upgrade',
          'action.equip': 'Equip',
          'action.equipped': 'Equipped',
          'action.sell': 'Sell',
          'action.lock': 'Toggle lock',
          'action.claim': 'Claim',
          'action.claimed': 'Claimed',
          'action.open': 'Open',
          'action.apply': 'Apply',
          'action.revert': 'Revert',
          'action.reset': 'Reset',
          'action.next': 'Next',
          'action.previous': 'Previous',
          'action.back': 'Back',
          'action.ready': 'Ready',
          'action.max': 'MAX',
          'action.level': 'Level {level}',
          'action.cost': 'Cost {cost}',
          'action.buyLevel': '+{count} · {cost}',
          'action.details': 'Details',
          'action.remaining': '{seconds}s left',
          'action.selected': 'Selected',
          'action.select': 'Select',
          'action.attack': 'Attack',
          'master.title': 'Ember Guardian',
          'master.desc': 'Strengthen your blade. Climb beyond the ridge.',
          'master.level': 'Level {level} · Tap damage {damage}',
          'master.buyMode': 'Buy ×{count}',
          'master.skills': 'Talents',
          'master.perks': 'Blessings',
          'master.prestige': 'Rebirth',
          'prestige.title': 'Carry the ember forward',
          'prestige.desc': 'Your stage, gold, guardian and hero levels reset. Gear, spirits, relics and talents remain.',
          'prestige.reward': 'Memory shards +{value}',
          'prestige.start': 'Next expedition begins at stage {stage}',
          'prestige.locked': 'Rebirth unlocks at stage 60',
          'prestige.done': 'Rebirth complete. A new expedition begins.',
          'hero.stats': 'Level {level} · DPS {damage}',
          'hero.locked': 'Unlocks at stage {stage}',
          'hero.title': 'The Expedition',
          'hero.mastery': 'Weapons & scrolls',
          'hero.masteryInfo': 'Weapons {weapons} · Scrolls {scrolls}\nPermanently increase your heroes’ damage.',
          'equipment.title': 'Equipment Vault',
          'equipment.summary': 'Shards {shards} · Inventory {count}/100',
          'equipment.craft': 'Craft set',
          'equipment.sets': 'Sets',
          'equipment.item': '{slot} · {rarity} +{level}',
          'equipment.power': 'All damage ×{power}',
          'equipment.compare': 'Current ×{current} → Selected ×{next}',
          'equipment.sellConfirm': 'Sell this item for gems. Sold equipment cannot be recovered.',
          'equipment.craftDesc': 'Receive the next uncrafted piece.\nRequired shards {cost} · Owned {shards}',
          'equipment.setInfo': 'Collected {count} · Complete sets {sets}\nTotal crafting spend {spent}\nCollection history remains after selling.',
          'equipment.empty': 'Equipment starts dropping at stage 15.',
          'equipment.protected': 'Locked or equipped',
          'pet.title': 'Spirit Sanctuary',
          'pet.hatch': 'Hatch egg',
          'pet.bonus': 'Level {level} · {bonus} bonus',
          'pet.locked': 'Spirits unlock at stage 8',
          'pet.info': 'The active spirit grants 100% power. Other spirits grant up to 100% as their level increases.',
          'artifact.title': 'Forgotten Relics',
          'artifact.balance': 'Memory shards {value}',
          'artifact.discover': 'Discover · {cost}',
          'artifact.stats': 'Level {level} · {effect}',
          'artifact.empty': 'Rebirth to earn memory shards and discover relics.',
          'artifact.cost': 'Upgrade · {cost}',
          'shop.regular': 'Regular',
          'shop.progression': 'Progress',
          'shop.limited': 'Limited',
          'shop.pet': '3 spirit levels',
          'shop.shards': '10 crafting shards',
          'shop.chest': 'Expedition chest',
          'shop.chestInfo': 'Receive 10 crafting shards, 1 geode and 1 hero weapon.',
          'shop.confirm': 'Spend {cost} gems.',
          'shop.free': 'Daily free gems',
          'shop.unavailable': 'Payment offers require a connected store.',
          'shop.locked': 'Claim after reaching the required milestone.',
          'skills.title': 'Talent Training',
          'skills.points': 'Available {points} · Draft cost {cost}',
          'skills.node': '{branch} {tier} · Lv {level}',
          'skills.info': 'Each next tier requires the previous node at level 3. Levels cost 1, 2, 3… points. Drafts take effect only after Apply.',
          'skills.resetConfirm': 'Reset all talents and refund spent points.',
          'perks.title': 'Expedition Blessings',
          'perks.row': '{name} · Owned {count}',
          'perks.info': 'Boost the related progression multiplier for five minutes.',
          'daily.title': 'Daily Tasks',
          'daily.progress': '{current} / {goal}',
          'daily.0': 'Daily attendance',
          'daily.1': 'Tap 100 times',
          'daily.2': 'Defeat 50 enemies',
          'daily.3': 'Rebirth once',
          'daily.reward': 'Gems +{gems}',
          'milestone.title': 'Expedition Milestones',
          'milestone.row': 'Best stage {stage} · 25 gems / 5 shards',
          'inbox.title': 'Inbox',
          'inbox.empty': 'No new messages.',
          'offline.title': 'Welcome Back',
          'offline.reward': 'Offline gold {gold}',
          'offline.info': 'Collect up to eight hours of offline earnings.',
          'menu.title': 'Expedition Journal',
          'menu.daily': 'Daily tasks',
          'menu.milestones': 'Milestones',
          'menu.raid': 'Solo raid',
          'menu.cards': 'Raid cards',
          'menu.event': 'Ember festival',
          'menu.meta': 'Advanced growth',
          'menu.clan': 'Guild',
          'menu.tournament': 'Tournament',
          'menu.profile': 'Profile',
          'menu.settings': 'Settings',
          'menu.inbox': 'Inbox',
          'online.title': 'Online Services',
          'online.unavailable': 'This build uses local saves. Real guilds, chat and tournament matchmaking require a connected server.',
          'profile.stats': 'Best stage {stage}\nRebirths {prestiges}\nEnemies defeated {kills}\nTotal taps {taps}\nRelics {artifacts}\nTotal spirit levels {pets}',
          'settings.language': 'Language',
          'settings.audio': 'Sound {state}',
          'settings.on': 'On',
          'settings.off': 'Off',
          'settings.about': 'Cocos Creator 3.8.8 · v0.1.0\nTTSofts · Independent retro idle RPG',
          'settings.save': 'Progress saved',
          'settings.saveButton': 'Save now',
          'settings.export': 'Export save data',
          'raid.title': 'Rift Raid',
          'raid.portal': 'Portal {portal}',
          'raid.desc': 'Choose three cards, then tap body parts for 30 seconds. Destroyed parts cannot be attacked.',
          'raid.locked': 'Raids unlock at best stage 100',
          'raid.damage': 'Damage {damage} · {seconds}s',
          'raid.result': 'Raid Results',
          'raid.reward': 'Damage {damage}\nEssence +{dust}\n1 fragment for each used card',
          'raid.part': 'Part {part}',
          'raid.deck': 'Deck {a} / {b} / {c}',
          'raid.upgrade': 'Upgrade · {cost} essence',
          'raid.card': 'Level {level} · Fragments {fragments}',
          'raid.dust': 'Essence {dust}',
          'event.title': 'Ember Festival',
          'event.balance': 'Festival tokens {tokens}',
          'event.path': 'Reward path',
          'event.board': 'Ruin exploration',
          'event.rule': 'Defeat enemies for tokens. The reward path requires a token balance; exploration costs 20 tokens per tile.',
          'event.reward': '{tokens} tokens · 15 gems / 5 shards',
          'event.tile': 'Explore {index}',
          'event.found': 'Gems +{gems}',
          'meta.title': 'Advanced Growth',
          'meta.souls': 'Soul collection',
          'meta.gems': 'Star stones',
          'meta.monuments': 'Monuments',
          'meta.research': 'Soul research',
          'meta.soulInfo': 'Souls {souls} · Collected {count}/120\nUnlock at stage 100,000 or account age 30 days.',
          'meta.summon': 'Summon · 10 souls',
          'meta.gemInfo': 'Geodes {geodes} · Collected {count}/24',
          'meta.crack': 'Open geode',
          'meta.stone': 'Star stone {index} · Lv {level}',
          'meta.monumentInfo': 'Unlock at stage 180,000\nSeason memories {value}',
          'meta.monument': 'Monument {index} · Lv {level}',
          'meta.researchNode': 'Research {index} · Lv {level}',
          'error.currency': 'Not enough currency.',
          'error.locked': 'Not unlocked yet.',
          'error.mana': 'Not enough mana or still on cooldown.',
          'error.full': 'The equipment vault is full.',
          'error.complete': 'Collection complete.',
          'error.invalid': 'Invalid request.',
          'error.prerequisite': 'Upgrade the prerequisite talent first.',
          'error.protected': 'Locked or equipped items cannot be sold.',
          'error.timer': 'Not ready yet.',
          'error.claimed': 'Already claimed or requirements not met.',
          'error.save': 'Unable to read the save. Please preserve the original data.',
          'error.storage': 'Unable to access save storage.',
          'battle.failed': 'Time is up. Upgrade and challenge the boss again.',
          'battle.fight': 'Fight boss',
          'battle.leave': 'Leave boss',
          'unlock.pet': 'Spirit companions unlocked.',
          'reward.done': 'Rewards received.',
          'fairy.title': 'A Guide’s Gift',
          'fairy.reward': 'Expedition gold received.',
          'empty': 'Nothing collected yet.'
        }
      });
      var pairs = {
        hero: [['로웬', '카엘', '세라', '브람', '이리스', '단테', '미라', '오린', '베라', '녹스', '리아', '에단', '실바', '카인', '루나', '레온', '아샤', '에코', '레이븐', '솔', '린', '아르곤', '제이드', '엘리온'], ['Rowen', 'Kael', 'Sera', 'Bram', 'Iris', 'Dante', 'Mira', 'Orin', 'Vera', 'Nox', 'Ria', 'Ethan', 'Silva', 'Kain', 'Luna', 'Leon', 'Asha', 'Echo', 'Raven', 'Sol', 'Lyn', 'Argon', 'Jade', 'Elion']],
        pet: [['불씨 여우', '바위 매', '그늘 늑대', '서리 사슴', '구리 뱀', '별빛 까마귀', '폭풍 표범', '청동 거북', '숲의 용', '황혼 독수리', '수정 도마뱀', '새벽 호랑이'], ['Ember Fox', 'Stone Hawk', 'Shade Wolf', 'Frost Stag', 'Copper Serpent', 'Star Raven', 'Storm Panther', 'Bronze Turtle', 'Grove Drake', 'Dusk Eagle', 'Crystal Lizard', 'Dawn Tiger']],
        spell: [['유성검', '날카로운 눈', '황금 손길', '불꽃검', '전장의 함성', '그림자 분신'], ['Meteor Blade', 'Keen Sight', 'Golden Touch', 'Flame Blade', 'Battle Cry', 'Shadow Echo']],
        branch: [['검술', '소환', '지휘', '비전', '암습', '연금'], ['Blade', 'Summon', 'Command', 'Arcane', 'Shadow', 'Alchemy']],
        slot: [['검', '투구', '갑옷', '오라', '문장'], ['Sword', 'Helm', 'Armor', 'Aura', 'Sigil']],
        rarity: [['일반', '희귀', '전설', '신화', '고유', '축제'], ['Common', 'Rare', 'Legendary', 'Mythic', 'Unique', 'Festival']],
        effect: [['모든 피해', '탭 피해', '동료 피해', '골드 획득'], ['All damage', 'Tap damage', 'Hero damage', 'Gold gain']]
      };
      var _loop = function _loop() {
        var _Object$entries$_i = _Object$entries[_i],
          prefix = _Object$entries$_i[0],
          _Object$entries$_i$ = _Object$entries$_i[1],
          ko = _Object$entries$_i$[0],
          en = _Object$entries$_i$[1];
        ko.forEach(function (value, i) {
          translations.ko[prefix + "." + i] = value;
          translations.en[prefix + "." + i] = en[i];
        });
      };
      for (var _i = 0, _Object$entries = Object.entries(pairs); _i < _Object$entries.length; _i++) {
        _loop();
      }
      var relicKO = ['새벽의 검', '재의 왕관', '별의 나침반', '황금 잎', '용의 인장', '달의 수정', '바람의 서', '고대 동전', '붉은 랜턴', '철의 심장', '심연의 눈', '왕의 잔', '여명의 종', '운명의 바늘', '서리 거울', '영원의 불씨', '고대 망치', '까마귀 깃털', '균열 열쇠', '은빛 모래', '수호자의 약속', '파수꾼의 반지', '부서진 별', '흑요석 꽃', '정령의 뿔', '잊힌 악보', '태양의 파편', '황혼의 가면', '잿빛 모래시계', '마지막 봉화'];
      var relicEN = ['Dawnblade', 'Ashen Crown', 'Star Compass', 'Golden Leaf', 'Drake Seal', 'Moon Crystal', 'Wind Codex', 'Ancient Coin', 'Red Lantern', 'Iron Heart', 'Abyssal Eye', 'Royal Chalice', 'Daybreak Bell', 'Fate Needle', 'Frost Mirror', 'Eternal Ember', 'Ancient Hammer', 'Raven Feather', 'Rift Key', 'Silver Sand', 'Guardian Oath', 'Warden Ring', 'Broken Star', 'Obsidian Bloom', 'Spirit Horn', 'Lost Score', 'Sun Fragment', 'Twilight Mask', 'Ash Hourglass', 'Last Beacon'];
      relicKO.forEach(function (s, i) {
        translations.ko["artifact." + i] = s;
        translations.en["artifact." + i] = relicEN[i];
      });
      for (var i = 0; i < 18; i++) {
        translations.ko["card." + i] = ['폭발', '침식', '수호'][i % 3] + ' ' + String(Math.floor(i / 3) + 1);
        translations.en["card." + i] = ['Burst', 'Affliction', 'Support'][i % 3] + ' ' + String(Math.floor(i / 3) + 1);
      }
      Object.assign(translations.ko, {
        "online.defaultName": "원정자",
        "online.guildName": "길드 이름 입력",
        "online.create": "길드 생성",
        "online.members": "길드원 {count}명",
        "online.join": "참가",
        "online.roster": "길드원",
        "online.guildRaid": "협동 레이드",
        "online.message": "메시지 입력",
        "online.send": "전송",
        "online.refresh": "새로고침",
        "online.leave": "길드 탈퇴",
        "online.leaveConfirm": "이 길드에서 탈퇴합니다. 길드장은 먼저 권한을 넘겨야 합니다.",
        "online.leader": "길드장",
        "online.member": "길드원",
        "online.transfer": "길드장 위임",
        "online.kick": "내보내기",
        "online.guildHP": "공동 보스 HP {hp}",
        "online.guildRaidInfo": "개발 서버 협동 공격: 12시간마다 3회.\n공격당 고정 피해 500이 서버에 반영됩니다.",
        "online.competitionInfo": "개발 대회는 하루마다 독립 원정으로 진행됩니다. 메인 월드 성장과 분리되며 순위는 서버에서 계산합니다.",
        "online.enter": "독립 원정 입장",
        "online.rank": "{rank}위 · {name}",
        "online.abyss": "심연의 원정",
        "online.upgradeMaster": "수호자 강화 · 현재 {level}레벨",
        "online.backMain": "메인 원정으로",
        "online.auth": "온라인 계정 인증이 필요합니다.",
        "online.noGuild": "가입한 길드가 없습니다.",
        "online.alreadyGuild": "이미 길드에 가입되어 있습니다.",
        "online.notFound": "대상을 찾을 수 없습니다.",
        "online.full": "길드 정원이 가득 찼습니다.",
        "online.transferFirst": "다른 길드원에게 길드장을 먼저 위임하세요.",
        "online.permission": "권한이 없습니다.",
        "online.noAttacks": "다음 주기까지 공격 횟수를 모두 사용했습니다.",
        "online.raidComplete": "공동 보스를 처치했습니다.",
        "online.notJoined": "대회에 먼저 참가하세요.",
        "online.ended": "대회가 종료되었습니다.",
        "online.notEnded": "아직 대회가 진행 중입니다.",
        "online.rateLimit": "잠시 후 다시 시도하세요.",
        "online.serverError": "서버 요청을 처리하지 못했습니다.",
        "online.unreachable": "개발 서버에 연결할 수 없습니다. 서버 실행 상태를 확인하세요."
      });
      Object.assign(translations.en, {
        "online.defaultName": "Wanderer",
        "online.guildName": "Enter guild name",
        "online.create": "Create guild",
        "online.members": "{count} members",
        "online.join": "Join",
        "online.roster": "Members",
        "online.guildRaid": "Guild raid",
        "online.message": "Enter message",
        "online.send": "Send",
        "online.refresh": "Refresh",
        "online.leave": "Leave guild",
        "online.leaveConfirm": "Leave this guild. Leaders must transfer ownership first.",
        "online.leader": "Leader",
        "online.member": "Member",
        "online.transfer": "Transfer leadership",
        "online.kick": "Remove member",
        "online.guildHP": "Shared boss HP {hp}",
        "online.guildRaidInfo": "Development co-op: 3 attacks every 12 hours.\nEach attack applies 500 server-confirmed damage.",
        "online.competitionInfo": "Development tournaments run daily in an independent expedition. Progress is separate from the main world and ranked by the server.",
        "online.enter": "Enter expedition",
        "online.rank": "#{rank} · {name}",
        "online.abyss": "Abyss Expedition",
        "online.upgradeMaster": "Upgrade guardian · Level {level}",
        "online.backMain": "Return to main",
        "online.auth": "Online account authentication required.",
        "online.noGuild": "You have not joined a guild.",
        "online.alreadyGuild": "Already a guild member.",
        "online.notFound": "Not found.",
        "online.full": "Guild is full.",
        "online.transferFirst": "Transfer leadership to another member first.",
        "online.permission": "Permission denied.",
        "online.noAttacks": "No attacks left until the next cycle.",
        "online.raidComplete": "The shared boss has been defeated.",
        "online.notJoined": "Join the tournament first.",
        "online.ended": "The tournament has ended.",
        "online.notEnded": "The tournament is still active.",
        "online.rateLimit": "Please try again shortly.",
        "online.serverError": "The server could not process the request.",
        "online.unreachable": "Cannot connect to the development server. Check that it is running."
      });
      Object.assign(translations.ko, {
        "menu.achievements": "업적",
        "achievement.title": "원정 업적",
        "achievement.0": "누적 탭",
        "achievement.1": "누적 처치",
        "achievement.2": "최고 구역",
        "achievement.3": "누적 환생",
        "spell.title": "주문",
        "spell.detail": "레벨 {level} · 수호자 {unlock}레벨 해금 · 마나 {mana}",
        "spell.multicast": "수호자 500레벨부터 활성 주문을 최대 3회 중첩할 수 있습니다.",
        "spell.swap": "이 슬롯의 주문을 교체합니다. 기존 주문의 활성 효과는 종료됩니다.",
        "spell.6": "쌍둥이 정령",
        "spell.7": "검의 폭풍",
        "spell.8": "천둥 포격",
        "spell.9": "황혼의 선물",
        "artifact.salvage": "유물 분해",
        "artifact.salvageInfo": "보석 20개를 사용하여 분해하고 강화에 투자한 조각의 80%를 돌려받습니다. 발견 비용은 환급하지 않습니다.",
        "artifact.enchant": "각성 · 조각 1,000",
        "artifact.enchantInfo": "30개 유물을 모두 보유해야 합니다. 각성한 유물은 분해할 수 없습니다.",
        "artifact.salvaged": "분해한 유물",
        "artifact.rebuyInfo": "보석 25개 · 1레벨로 복원",
        "equipment.bulk": "일괄 판매",
        "equipment.bulkInfo": "잠금·장착 장비를 제외한 모든 장비를 판매합니다.",
        "equipment.transmog": "외형 적용"
      });
      Object.assign(translations.en, {
        "menu.achievements": "Achievements",
        "achievement.title": "Expedition Achievements",
        "achievement.0": "Lifetime taps",
        "achievement.1": "Lifetime kills",
        "achievement.2": "Highest stage",
        "achievement.3": "Lifetime rebirths",
        "spell.title": "Spells",
        "spell.detail": "Level {level} · Guardian level {unlock} required · Mana {mana}",
        "spell.multicast": "At guardian level 500, active spells can stack up to three times.",
        "spell.swap": "Replace the spell in this slot. Its current active effect will end.",
        "spell.6": "Twin Spirits",
        "spell.7": "Blade Storm",
        "spell.8": "Thunder Volley",
        "spell.9": "Twilight Gift",
        "artifact.salvage": "Salvage relic",
        "artifact.salvageInfo": "Spend 20 gems to salvage and recover 80% of invested upgrade shards. Discovery costs are not refunded.",
        "artifact.enchant": "Enchant · 1,000 shards",
        "artifact.enchantInfo": "Requires all 30 relics. Enchanted relics cannot be salvaged.",
        "artifact.salvaged": "Salvaged Relics",
        "artifact.rebuyInfo": "25 gems · Restore at level 1",
        "equipment.bulk": "Bulk sell",
        "equipment.bulkInfo": "Sell all unequipped, unlocked equipment.",
        "equipment.transmog": "Appearance"
      });
      Object.assign(translations.ko, {
        "extra.hub": "성장과 축제",
        "extra.build": "빌드 개요",
        "extra.talents": "영구 성장 기록",
        "extra.perks": "선택 축복",
        "extra.petPuzzle": "정령 짝 맞추기",
        "extra.petMilestones": "정령 이정표",
        "extra.dustShop": "정수 상점",
        "extra.crystal": "카드 공명",
        "extra.souls": "영혼 소환",
        "extra.gems": "별빛 보석",
        "extra.monuments": "시즌 기념비",
        "extra.collectibles": "일일 수집 보상",
        "extra.cosmetics": "프로필 외형",
        "extra.notifications": "알림 설정",
        "extra.export": "저장 파일 내보내기",
        "extra.eventModes": "축제 모드",
        "extra.limited": "일일 특가",
        "extra.buildRow": "노드 레벨 {levels}\n현재 탭 피해 {damage}",
        "extra.mastery": "무기·두루마리 수집",
        "extra.crafting": "제작 누적",
        "extra.ascensions": "현재 동료 승천",
        "extra.talentValue": "누적 {value}",
        "extra.perk": "축복 {id}",
        "extra.owned": "보유 {count}",
        "extra.replace": "교체",
        "extra.perkWarning": "기존 축복의 활성 효과를 종료하고 선택을 교체합니다.",
        "extra.heroStats": "레벨 {level} · 승천 {ascensions}\n스킬 {skills} · 무기 {weapons} · 두루마리 {scrolls}",
        "extra.heroSkill": "동료 스킬 강화",
        "extra.ascend": "승천",
        "extra.ascendInfo": "동료 1,000레벨 필요. 레벨을 1로 되돌리고 피해 배율을 높입니다.",
        "extra.heroInfo": "스킬 해금: 레벨 10/25/50/100/200/400/800\n승천과 스킬은 환생 시 초기화됩니다.",
        "extra.puzzleInfo": "남은 시도 {energy} · 완성 {matches}/8\n같은 숫자 두 장을 찾으세요.",
        "extra.puzzleReward": "짝 완성: 정령 레벨 +1 · 모두 완성: 조각 +5",
        "extra.petTarget": "정령 총레벨 {target}",
        "extra.dustOffer": "조각 5개 · 비용 정수 20\n현재 정수 {dust}",
        "extra.crystalSlot": "공명 슬롯 {slot}",
        "extra.crystalRule": "카드 총레벨 {level}/1,000\n전투 중 변경 불가",
        "extra.cardBoost": "기본 {base} · 적용 {effective}",
        "extra.soulSummary": "영혼 {souls} · 소환 등급 {level}\n누적 연구 포인트 {points} · 배너 {banner}",
        "extra.banner": "배너 변경",
        "extra.summon": "{count}회 소환",
        "extra.levelAll": "전체 레벨업",
        "extra.titan": "영혼 {id}",
        "extra.titanStats": "레벨 {level} · 보유 {copies}\n다음 레벨 필요 {cost}",
        "extra.rarity": "희귀도 {rarity}",
        "extra.gemInfo": "희귀도 {rarity} · 효과 단계 {bonus}",
        "extra.mysticResearch": "신비 연구",
        "extra.researchPoints": "남은 연구 포인트 {points}",
        "extra.enchanted": "각성 상태 {value}",
        "extra.monumentRefund": "투자한 시즌 기억의 80%를 돌려받습니다. 각성한 기념비는 분해할 수 없습니다.",
        "extra.enchantChoices": "각성 후보",
        "extra.seasonRewards": "시즌 보상 우편",
        "extra.collectible.0": "길잡이 선물 3회",
        "extra.collectible.1": "장비 3개 획득",
        "extra.collectible.2": "알 1개 부화",
        "extra.mailReward": "보석 {gems} · 조각 {shards}",
        "extra.mail.welcome": "원정 지원품",
        "extra.mail.season": "기념비 시즌 종료 보상",
        "extra.mail.event": "축제 종료 보상",
        "extra.delete": "삭제",
        "extra.cosmetic.0": "망토",
        "extra.cosmetic.1": "테두리",
        "extra.cosmetic.2": "배경",
        "extra.style": "외형 {id}",
        "extra.browserOnly": "웹 빌드에서 사용할 수 있습니다.",
        "extra.notice.0": "알 부화",
        "extra.notice.1": "일일 보상",
        "extra.notice.2": "레이드",
        "extra.notice.3": "대회",
        "extra.notice.4": "축제",
        "extra.notice.5": "우편",
        "extra.eventShop": "축제 상점",
        "extra.alchemy": "연금술",
        "extra.drop": "행운 낙하",
        "extra.tower": "탐험의 탑",
        "extra.globalRaid": "공동 토벌",
        "extra.eventRanks": "토벌 기여 순위",
        "extra.contribution": "누적 피해 {value}",
        "extra.tokenCost": "축제 토큰 {count}개",
        "extra.alchemyInfo": "발견한 조합 {count}/10 · 토큰 {tokens}\n조합당 토큰 30개",
        "extra.ingredient": "재료 {id}",
        "extra.combine": "조합",
        "extra.dropBall": "구슬 떨어뜨리기",
        "extra.towerInfo": "{floor}층 · 열쇠 {keys}\n문 하나를 선택하세요.",
        "extra.door": "문 {id}",
        "extra.limitedOffer": "제작·카드 보급함",
        "extra.limitedInfo": "보석 100개 → 조각 20개 + 카드 조각 10개\n하루 한 번 구매"
      });
      Object.assign(translations.en, {
        "extra.hub": "Progression & Events",
        "extra.build": "Build Overview",
        "extra.talents": "Permanent Progression",
        "extra.perks": "Selected Blessings",
        "extra.petPuzzle": "Spirit Memory",
        "extra.petMilestones": "Spirit Milestones",
        "extra.dustShop": "Dust Shop",
        "extra.crystal": "Card Resonance",
        "extra.souls": "Soul Summoning",
        "extra.gems": "Starlight Gems",
        "extra.monuments": "Season Monuments",
        "extra.collectibles": "Daily Collections",
        "extra.cosmetics": "Profile Appearance",
        "extra.notifications": "Notifications",
        "extra.export": "Export Save",
        "extra.eventModes": "Festival Modes",
        "extra.limited": "Daily Offer",
        "extra.buildRow": "Node levels {levels}\nCurrent tap damage {damage}",
        "extra.mastery": "Weapons & Scrolls",
        "extra.crafting": "Lifetime Crafting",
        "extra.ascensions": "Current Hero Ascensions",
        "extra.talentValue": "Total {value}",
        "extra.perk": "Blessing {id}",
        "extra.owned": "Owned {count}",
        "extra.replace": "Replace",
        "extra.perkWarning": "Replace this blessing and end its active effect.",
        "extra.heroStats": "Level {level} · Ascensions {ascensions}\nSkills {skills} · Weapons {weapons} · Scrolls {scrolls}",
        "extra.heroSkill": "Upgrade Hero Skill",
        "extra.ascend": "Ascend",
        "extra.ascendInfo": "Requires hero level 1,000. Reset to level 1 and increase damage.",
        "extra.heroInfo": "Skill tiers: 10/25/50/100/200/400/800\nAscensions and skills reset on rebirth.",
        "extra.puzzleInfo": "Attempts {energy} · Matches {matches}/8\nFind two matching numbers.",
        "extra.puzzleReward": "Each pair: spirit level +1 · Complete: shards +5",
        "extra.petTarget": "Total spirit level {target}",
        "extra.dustOffer": "5 fragments · 20 dust\nOwned dust {dust}",
        "extra.crystalSlot": "Resonance Slot {slot}",
        "extra.crystalRule": "Total card level {level}/1,000\nCannot change during battle",
        "extra.cardBoost": "Base {base} · Effective {effective}",
        "extra.soulSummary": "Souls {souls} · Summon tier {level}\nLifetime research points {points} · Banner {banner}",
        "extra.banner": "Change Banner",
        "extra.summon": "Summon ×{count}",
        "extra.levelAll": "Level All",
        "extra.titan": "Soul {id}",
        "extra.titanStats": "Level {level} · Copies {copies}\nNext level costs {cost}",
        "extra.rarity": "Rarity {rarity}",
        "extra.gemInfo": "Rarity {rarity} · Effect tier {bonus}",
        "extra.mysticResearch": "Mystic Research",
        "extra.researchPoints": "Research points {points}",
        "extra.enchanted": "Enchantment {value}",
        "extra.monumentRefund": "Recover 80% of invested mementos. Enchanted monuments cannot be salvaged.",
        "extra.enchantChoices": "Enchantment Choices",
        "extra.seasonRewards": "Season Reward Mail",
        "extra.collectible.0": "Claim 3 Fairy Gifts",
        "extra.collectible.1": "Collect 3 Equipment",
        "extra.collectible.2": "Hatch 1 Egg",
        "extra.mailReward": "Gems {gems} · Shards {shards}",
        "extra.mail.welcome": "Expedition Supplies",
        "extra.mail.season": "Monument Season Rewards",
        "extra.mail.event": "Festival Rewards",
        "extra.delete": "Delete",
        "extra.cosmetic.0": "Cape",
        "extra.cosmetic.1": "Frame",
        "extra.cosmetic.2": "Background",
        "extra.style": "Style {id}",
        "extra.browserOnly": "Available in the web build.",
        "extra.notice.0": "Egg Ready",
        "extra.notice.1": "Daily Rewards",
        "extra.notice.2": "Raid",
        "extra.notice.3": "Tournament",
        "extra.notice.4": "Festival",
        "extra.notice.5": "Mail",
        "extra.eventShop": "Festival Shop",
        "extra.alchemy": "Alchemy",
        "extra.drop": "Fortune Drop",
        "extra.tower": "Exploration Tower",
        "extra.globalRaid": "Global Raid",
        "extra.eventRanks": "Raid Rankings",
        "extra.contribution": "Total damage {value}",
        "extra.tokenCost": "Festival tokens {count}",
        "extra.alchemyInfo": "Recipes {count}/10 · Tokens {tokens}\n30 tokens per combination",
        "extra.ingredient": "Ingredient {id}",
        "extra.combine": "Combine",
        "extra.dropBall": "Drop Ball",
        "extra.towerInfo": "Floor {floor} · Keys {keys}\nChoose a door.",
        "extra.door": "Door {id}",
        "extra.limitedOffer": "Crafting & Card Bundle",
        "extra.limitedInfo": "100 gems → 20 shards + 10 card fragments\nOnce per day"
      });
      Object.assign(translations.ko, {
        "extra.guildTools": "길드 관리·활동",
        "extra.guildSearch": "길드 검색",
        "extra.guildEdit": "길드 정보 편집",
        "extra.stickers": "스티커",
        "extra.guildLogs": "토벌 기록",
        "extra.guildVault": "길드 금고",
        "extra.retire": "토벌 재시작",
        "extra.search": "검색",
        "extra.description": "소개 입력",
        "extra.vaultInfo": "누적 기여 {damage}\n현재 12시간 주기 피해 1,000 달성 시\n보석 20개·조각 5개, 주기당 1회 수령",
        "extra.retireInfo": "길드장만 보스 체력을 초기화할 수 있습니다. 사용한 공격 횟수는 돌아오지 않습니다.",
        "extra.abyssShop": "독립 상점 · 보석 100",
        "extra.sticker.0": "좋아요!",
        "extra.sticker.1": "준비 완료!",
        "extra.sticker.2": "감사합니다!",
        "extra.sticker.3": "공격!",
        "extra.sticker.4": "잠시만요!",
        "extra.sticker.5": "축하합니다!"
      });
      Object.assign(translations.en, {
        "extra.guildTools": "Guild Activities",
        "extra.guildSearch": "Find Guild",
        "extra.guildEdit": "Edit Guild",
        "extra.stickers": "Stickers",
        "extra.guildLogs": "Raid Log",
        "extra.guildVault": "Guild Vault",
        "extra.retire": "Restart Raid",
        "extra.search": "Search",
        "extra.description": "Enter Description",
        "extra.vaultInfo": "Total contribution {damage}\nReach 1,000 damage this 12-hour cycle\n20 gems + 5 shards, once per cycle",
        "extra.retireInfo": "Only the leader can reset boss health. Used attacks are not restored.",
        "extra.abyssShop": "Expedition Shop · 100 Gems",
        "extra.sticker.0": "Great!",
        "extra.sticker.1": "Ready!",
        "extra.sticker.2": "Thank you!",
        "extra.sticker.3": "Attack!",
        "extra.sticker.4": "One moment!",
        "extra.sticker.5": "Congratulations!"
      });
      Object.assign(translations.ko, {
        'extra.serviceStatus': '서비스 상태',
        'extra.serviceReady': '서비스 정상 · 버전 {version}',
        'extra.maintenance': '서비스 점검 중입니다. 잠시 후 다시 연결하세요.',
        'online.maintenance': '서버 점검 중입니다. 로컬 원정은 계속 플레이할 수 있습니다.'
      });
      Object.assign(translations.en, {
        'extra.serviceStatus': 'Service Status',
        'extra.serviceReady': 'Service available · Version {version}',
        'extra.maintenance': 'Service maintenance. Please reconnect later.',
        'online.maintenance': 'Server maintenance. Your local expedition remains available.'
      });
      Object.assign(translations.ko, {
        'online.guildRaidInfo': '12시간마다 3회 · 30초 부위 전투\n서버에서 카드 발동과 피해를 계산합니다.',
        'extra.raidPending': '진행 중인 토벌의 결과를 먼저 제출하세요.',
        'extra.guildDeckInfo': '현재 선택 덱 · 서버 공용 카드 1레벨\n로컬 카드 강화는 솔로 레이드에 적용됩니다.',
        'extra.raidSubmit': '토벌 결과 제출',
        'extra.raidSummary': '피해 {damage} · 보스 HP {hp}\n카드별 기여: {cards}'
      });
      Object.assign(translations.en, {
        'online.guildRaidInfo': '3 attempts per 12 hours · 30-second part battle\nCard triggers and damage are computed by the server.',
        'extra.raidPending': 'Submit your active raid result first.',
        'extra.guildDeckInfo': 'Selected deck · Server cards are level 1\nLocal card upgrades apply to solo raids.',
        'extra.raidSubmit': 'Submit Raid Result',
        'extra.raidSummary': 'Damage {damage} · Boss HP {hp}\nCard contribution: {cards}'
      });
      Object.assign(translations.ko, {
        'extra.eventShards': '제작 조각 5개'
      });
      Object.assign(translations.en, {
        'extra.eventShards': '5 Crafting Shards'
      });
      Object.assign(translations.ko, {
        "extra.retry": "다시 연결",
        "extra.weapons": "동료 무기",
        "extra.scrolls": "두루마리",
        "extra.masterySets": "완성한 전체 세트 {sets}",
        "extra.craftPower": "누적 제작 조각 {spent}\n제작 피해 배율 ×{power}",
        "extra.set": "장비 세트 {id}",
        "extra.setDetails": "세트 부위",
        "extra.collected": "수집 완료",
        "extra.missing": "미수집",
        "extra.summonCost": "영혼 {count}개를 사용해 소환합니다.",
        "extra.summonResult": "소환 결과"
      });
      Object.assign(translations.en, {
        "extra.retry": "Reconnect",
        "extra.weapons": "Hero Weapons",
        "extra.scrolls": "Scrolls",
        "extra.masterySets": "Complete full sets {sets}",
        "extra.craftPower": "Lifetime crafting shards {spent}\nCrafting damage ×{power}",
        "extra.set": "Equipment Set {id}",
        "extra.setDetails": "Set Pieces",
        "extra.collected": "Collected",
        "extra.missing": "Missing",
        "extra.summonCost": "Spend {count} souls to summon.",
        "extra.summonResult": "Summon Results"
      });
      Object.assign(translations.ko, {
        'battle.defeated': '처치!'
      });
      Object.assign(translations.en, {
        'battle.defeated': 'Defeated!'
      });
      Object.assign(translations.ko, {
        'layout.levelUp': '{cost}\n레벨 업',
        'layout.prestigeDesc': '환생\n원정을 다시 시작하고\n기억 조각을 획득합니다.',
        'layout.tapDamage': '{value} 탭 피해'
      });
      Object.assign(translations.en, {
        'layout.levelUp': '{cost}\nLevel Up',
        'layout.prestigeDesc': 'Prestige\nRestart your adventure\nfor precious relics.',
        'layout.tapDamage': '{value} Tap Damage'
      });
      Object.assign(translations.ko, {
        'layout.masterName': '소드 마스터',
        'layout.upgrade': '레벨 업',
        'master.skills': '스킬 트리'
      });
      Object.assign(translations.en, {
        'layout.masterName': 'Sword Master',
        'layout.upgrade': 'Level Up',
        'master.skills': 'Skill Tree',
        'master.prestige': 'Prestige'
      });
      Object.assign(translations.ko, {
        "complete.portals": "포털 선택",
        "complete.presets": "덱 프리셋",
        "complete.preset": "저장 덱 {slot}",
        "complete.saveDeck": "현재 덱 저장",
        "complete.dailyPortal": "일일 포털 보상",
        "complete.dailyPortalInfo": "서로 다른 포털 {count}/3 클리어\n먼지 50개 + 카드 조각 10개",
        "complete.portalReplay": "이전 포털에 재도전할 수 있습니다.",
        "complete.next": "다음",
        "complete.display": "화면 설정",
        "complete.scientific": "과학적 숫자 표기",
        "complete.effects": "전투 이펙트",
        "complete.support": "지원·저장 복구",
        "complete.supportInfo": "Cocos Creator 3.8.8 · 개발 빌드\n저장 파일을 내보내거나 복원할 수 있습니다. 복원 전 현재 진행을 백업합니다.\n온라인 기능은 로컬 개발 서버에 연결됩니다.",
        "complete.import": "저장 파일 가져오기",
        "complete.replaceSave": "선택한 저장으로 현재 진행을 교체합니다. 현재 진행은 복원 전 백업에 보관합니다.",
        "complete.account": "계정·클라우드 저장",
        "complete.rename": "이름 변경",
        "complete.cloudSave": "서버에 진행 저장",
        "complete.cloudLoad": "서버 진행 불러오기",
        "complete.cloudInfo": "서버 저장 버전 {version}",
        "complete.recoveryExport": "계정 복구 파일 내보내기",
        "complete.recoveryImport": "계정 복구 파일 가져오기",
        "complete.privateKey": "이 파일로 계정에 접근할 수 있습니다. 비공개로 보관하세요.",
        "complete.switchAccount": "복구 파일의 계정으로 전환합니다. 게임 진행은 자동 교체되지 않습니다.",
        "complete.serverCards": "길드 레이드 카드",
        "complete.serverCardInfo": "서버 저장 카드 · 먼지 {dust}\n길드 전투 제출 시 먼지·조각을 획득합니다.",
        "complete.cardProc.0": "4회 타격마다 카드 레벨 ×30 추가 피해",
        "complete.cardProc.1": "연속 타격 수(최대 20) × 카드 레벨 추가 피해",
        "complete.cardProc.2": "매 타격 카드 레벨 ×5 추가 피해",
        "online.saveConflict": "서버 저장이 변경되었습니다. 계정 화면을 다시 열어 확인하세요.",
        "extra.guildDeckInfo": "서버에 저장된 카드 레벨로 전투합니다.\n카드 레벨은 전투 시작 시 확정됩니다."
      });
      Object.assign(translations.en, {
        "complete.portals": "Select Portal",
        "complete.presets": "Deck Presets",
        "complete.preset": "Saved Deck {slot}",
        "complete.saveDeck": "Save Current Deck",
        "complete.dailyPortal": "Daily Portal Reward",
        "complete.dailyPortalInfo": "Clear 3 different portals: {count}/3\n50 dust + 10 card fragments",
        "complete.portalReplay": "Replay an unlocked portal.",
        "complete.next": "Next",
        "complete.display": "Display Settings",
        "complete.scientific": "Scientific Notation",
        "complete.effects": "Combat Effects",
        "complete.support": "Support & Save Recovery",
        "complete.supportInfo": "Cocos Creator 3.8.8 · Development build\nExport or restore a save file. Current progress is backed up before restoration.\nOnline features use the local development server.",
        "complete.import": "Import Save File",
        "complete.replaceSave": "Replace current progress with this save. Your current progress is backed up first.",
        "complete.account": "Account & Cloud Save",
        "complete.rename": "Change Name",
        "complete.cloudSave": "Save Progress to Server",
        "complete.cloudLoad": "Load Server Progress",
        "complete.cloudInfo": "Server save revision {version}",
        "complete.recoveryExport": "Export Account Recovery",
        "complete.recoveryImport": "Import Account Recovery",
        "complete.privateKey": "This file grants account access. Keep it private.",
        "complete.switchAccount": "Switch to the account in this recovery file. Game progress is not replaced automatically.",
        "complete.serverCards": "Guild Raid Cards",
        "complete.serverCardInfo": "Server cards · Dust {dust}\nSubmit guild battles to earn dust and fragments.",
        "complete.cardProc.0": "Every fourth hit: card level ×30 bonus damage",
        "complete.cardProc.1": "Bonus damage: hit count (up to 20) × card level",
        "complete.cardProc.2": "Every hit: card level ×5 bonus damage",
        "online.saveConflict": "The server save changed. Reopen Account to review the latest revision.",
        "extra.guildDeckInfo": "Battles use your server card levels.\nLevels are locked when an attack begins."
      });
      Object.assign(translations.ko, {
        'complete.craftPart': '조각 {cost}개로 선택한 세트 부위를 제작합니다.',
        'complete.regular': '일반 토너먼트',
        'complete.regularRule': '2일 주기 · 이전 일반 대회 성장을 이어갑니다.\n서버 원정 최고 스테이지로 순위를 계산합니다.\n개발 규칙이며 원작 매칭 규칙과 다릅니다.',
        'complete.tournamentEnd': '종료: {time}',
        'complete.rankInfo': '순위 {rank} · 최고 스테이지 {stage}\n현재 순위 기준 보석 {reward}개 + 조각 10개'
      });
      Object.assign(translations.en, {
        'complete.craftPart': 'Craft this set piece for {cost} shards.',
        'complete.regular': 'Regular Tournament',
        'complete.regularRule': '2-day cycle · Continue your previous regular entry.\nRanked by highest server expedition stage.\nDevelopment rules differ from the source game.',
        'complete.tournamentEnd': 'Ends: {time}',
        'complete.rankInfo': 'Rank {rank} · Best stage {stage}\nAt this rank: {reward} gems + 10 shards'
      });
      Object.assign(translations.ko, {
        'complete.history': '최고 스테이지 {stage} · {date}'
      });
      Object.assign(translations.en, {
        'complete.history': 'Best stage {stage} · {date}'
      });
      Object.assign(translations.ko, {
        "complete.pile": "장비 {count}",
        "complete.drops": "획득 장비",
        "complete.unlocked": "새 기능 해금",
        "complete.unlock.8": "펫을 얻었습니다. 펫 탭에서 동료를 선택하고 알을 부화하세요.",
        "complete.unlock.15": "장비 드롭이 해금되었습니다. 장비 더미에서 획득한 장비를 확인하세요.",
        "complete.unlock.60": "환생이 해금되었습니다. 기억 조각으로 영구 성장을 시작하세요.",
        "complete.unlock.100": "솔로 레이드와 길드가 해금되었습니다.",
        "complete.unlock.1000": "독립 월드 대회가 해금되었습니다.",
        "complete.unlock.100000": "영혼 소환이 해금되었습니다.",
        "complete.unlock.180000": "기념물 성장이 해금되었습니다.",
        "complete.discoverMonument": "기념물 발견",
        "complete.monumentCost": "기억 {cost}개 · 미보유 기념물 무작위 발견",
        "complete.petDetail": "레벨 {level}\n장착 시 해당 피해 ×{active}\n미장착 시 해당 피해 ×{passive}\n레벨 100에 패시브 효율 100%",
        "complete.heroSkillInfo": "현재 DPS {damage}\n스킬 해금 요구 레벨 {level} · 단계별 피해 ×1.5"
      });
      Object.assign(translations.en, {
        "complete.pile": "Gear {count}",
        "complete.drops": "Equipment Drops",
        "complete.unlocked": "Feature Unlocked",
        "complete.unlock.8": "Pets unlocked. Choose your companion and hatch eggs in the Pets tab.",
        "complete.unlock.15": "Equipment drops unlocked. Open the equipment pile to inspect your loot.",
        "complete.unlock.60": "Prestige unlocked. Use relics for permanent growth.",
        "complete.unlock.100": "Solo raids and guilds unlocked.",
        "complete.unlock.1000": "Independent world competitions unlocked.",
        "complete.unlock.100000": "Soul summoning unlocked.",
        "complete.unlock.180000": "Monument progression unlocked.",
        "complete.discoverMonument": "Discover Monument",
        "complete.monumentCost": "{cost} mementos · Discover a random unowned monument",
        "complete.petDetail": "Level {level}\nEquipped damage ×{active}\nPassive damage ×{passive}\nFull passive efficiency at level 100",
        "complete.heroSkillInfo": "Current DPS {damage}\nSkill unlock level {level} · ×1.5 damage per tier"
      });
      Object.assign(translations.ko, {
        'complete.applied': '적용했습니다.'
      });
      Object.assign(translations.en, {
        'complete.applied': 'Applied successfully.'
      });
      Object.assign(translations.ko, {
        "complete.reward.milestone": "최고 스테이지 {value} 달성!\n스킬 포인트 {count}개 획득",
        "complete.reward.weapon": "{hero}의 무기 획득!",
        "complete.reward.scroll": "{hero}의 두루마리 획득!",
        "complete.reward.weaponSet": "무기 전체 세트 {value}단계 완성!",
        "complete.reward.equipmentSet": "장비 세트 {value} 완성!\n모든 부위 수집 효과가 적용됩니다.",
        "complete.guildInfo": "길드 정보",
        "complete.joinGuild": "{name} 길드에 가입하시겠습니까?",
        "complete.guildInfoBody": "길드원 {count}/50\n{description}\n누적 피해 기여 {damage}",
        "complete.noDescription": "등록된 소개가 없습니다.",
        "complete.eventRules": "이벤트 규칙",
        "complete.eventRulesBody": "시즌 종료: {time}\n누적 획득 토큰 {tokens}\n보상 경로는 누적 획득량을 사용합니다. 상점에서 토큰을 써도 경로 진행은 유지됩니다.\n종료 후 남은 토큰 100개당 보석 1개를 우편으로 받습니다."
      });
      Object.assign(translations.en, {
        "complete.reward.milestone": "Reached stage {value}!\nEarned {count} skill points",
        "complete.reward.weapon": "Weapon acquired for {hero}!",
        "complete.reward.scroll": "Scroll acquired for {hero}!",
        "complete.reward.weaponSet": "Full weapon set level {value} completed!",
        "complete.reward.equipmentSet": "Equipment set {value} completed!\nThe full-set bonus is now active.",
        "complete.guildInfo": "Guild Information",
        "complete.joinGuild": "Join {name}?",
        "complete.guildInfoBody": "Members {count}/50\n{description}\nTotal contributed damage {damage}",
        "complete.noDescription": "No description yet.",
        "complete.eventRules": "Event Rules",
        "complete.eventRulesBody": "Season ends: {time}\nLifetime season tokens: {tokens}\nThe reward path uses earned tokens. Spending tokens in shops does not reduce path progress.\nAt season end, every 100 remaining tokens become 1 gem sent by mail."
      });
      Object.assign(translations.ko, {
        'complete.restoreBackup': '복원 전 백업으로 되돌리기'
      });
      Object.assign(translations.en, {
        'complete.restoreBackup': 'Undo Last Save Restoration'
      });
      Object.assign(translations.ko, {
        'complete.exportFile': '내보내기'
      });
      Object.assign(translations.en, {
        'complete.exportFile': 'Export'
      });
      Object.assign(translations.ko, {
        "money.store": "다이아 상점",
        "money.diamonds": "다이아 {count}개",
        "money.packInfo": "다이아 {count}개 지급",
        "money.balance": "보유 다이아 {count}개",
        "money.priceRegion": "한국 iOS 공개 가격 기준입니다. 실제 결제 전 스토어에서 최종 가격을 확인합니다.",
        "money.actualPrice": "연결된 스토어가 제공한 현재 가격입니다.",
        "money.pass": "시즌 패스",
        "money.passInfo": "현재 이벤트 종료까지 모든 광고 건너뛰기.\n추가 프리미엄 보상 구성은 아직 확정되지 않았습니다.",
        "money.starter": "스타터 번들",
        "money.special": "스페셜 번들",
        "money.bundleUnknown": "공개 가격은 확인했습니다. 계정·기간별 구성품을 확인한 뒤 구매할 수 있습니다.",
        "money.vip": "VIP · 광고 건너뛰기",
        "money.vipStatus": "VIP {tier} · {points} 포인트",
        "money.vipTier": "VIP {tier} · {points} 포인트",
        "money.vipBenefit.1": "환생 후 영웅 자동 해금·강화",
        "money.vipBenefit.2": "모든 유물 강화 버튼",
        "money.vipBenefit.3": "요정 광고 건너뛰기",
        "money.vipBenefit.4": "알 슬롯 2개 추가",
        "money.vipBenefit.5": "모든 광고 건너뛰기",
        "money.vipPass": "패스 만료: {time}",
        "money.noPass": "활성 패스 없음",
        "money.restore": "구매 복원",
        "money.retry": "미지급 구매·보상 다시 확인",
        "money.result": "구매·광고 결과",
        "money.confirm": "구매 확인",
        "money.confirmBody": "{name}\n{price}\n스토어 결제창에서 최종 승인합니다.",
        "money.purchased": "구매가 검증되어 보상을 지급했습니다.",
        "money.pending": "결제 승인을 기다리고 있습니다. 완료 후 미지급 확인에서 다시 연결하세요.",
        "money.cancelled": "구매를 취소했습니다. 비용이 청구되지 않았습니다.",
        "money.restored": "스토어 구매 내역을 확인했습니다. 이미 지급한 소모품은 중복 지급하지 않습니다.",
        "money.delivered": "확정된 미지급 보상을 확인했습니다.",
        "money.busy": "진행 중인 구매 또는 광고가 끝난 뒤 다시 시도하세요.",
        "money.storeUnavailable": "이 빌드에는 결제 스토어가 연결되지 않았습니다. 실제 청구와 상품 지급은 이루어지지 않았습니다.",
        "money.adsUnavailable": "광고 서비스가 연결되지 않았습니다. 시청 완료 보상은 지급되지 않았습니다.",
        "money.verification": "구매 또는 광고 완료를 검증하지 못했습니다. 다시 확인하세요.",
        "money.expired": "광고 요청이 만료되었습니다. 새로 요청하세요.",
        "money.limit": "이번 주기의 광고 보상 한도를 모두 사용했습니다.",
        "money.limitShort": "수령 완료",
        "money.disabled": "요정 광고 제안을 꺼 두었습니다. 요정 창에서 다시 켤 수 있습니다.",
        "money.fairy": "요정 선물",
        "money.fairyInfo": "기본 골드를 받거나 광고 보상을 확인하세요. 광고는 선택 사항입니다.",
        "money.fairyBonus": "요정 광고 보상",
        "money.adsOn": "요정 광고 제안 켜짐",
        "money.adsOff": "요정 광고 제안 꺼짐",
        "money.adPoints": "보상형 광고",
        "money.watch": "광고 보기",
        "money.adRule": "이번 주기 {used}/{limit}회\n다음 보상까지 {seconds}초",
        "money.optIn": "시청을 완료해야 보상을 받습니다. 취소·재고 없음·검증 실패 시 횟수를 소비하지 않습니다.",
        "money.adStatus.completed": "광고 보상을 지급했습니다.",
        "money.adStatus.cancelled": "시청을 취소했습니다. 보상 횟수는 그대로입니다.",
        "money.adStatus.no-fill": "현재 재생 가능한 광고가 없습니다. 잠시 후 다시 시도하세요.",
        "money.ad.fairy_diamond": "다이아 요정",
        "money.adReward.fairy_diamond": "다이아 10개 + 이벤트 토큰 15개\n하루 최대 5회",
        "money.ad.fairy_mana": "마나 요정",
        "money.adReward.fairy_mana": "최대 마나의 25% 회복",
        "money.ad.fairy_gold": "골드 요정",
        "money.adReward.fairy_gold": "현재 몬스터 골드 보상의 50배 획득",
        "money.ad.fairy_discount": "할인 요정",
        "money.adReward.fairy_discount": "60초 동안 마스터·영웅 골드 비용 90% 감소",
        "money.ad.fairy_skills": "주문 요정",
        "money.adReward.fairy_skills": "선택한 해금 주문을 마나 소모 없이 활성화",
        "money.ad.mega_boost": "메가 부스트",
        "money.adReward.mega_boost": "4시간 동안 모든 피해 2배",
        "money.ad.shop_chest": "광고 상자",
        "money.adReward.shop_chest": "장비 1개 보장 · 12시간마다 3회"
      });
      Object.assign(translations.en, {
        "money.store": "Diamond Shop",
        "money.diamonds": "{count} Diamonds",
        "money.packInfo": "Receive {count} diamonds",
        "money.balance": "Balance: {count} diamonds",
        "money.priceRegion": "Reference: Korean iOS prices. Confirm the final price in the store before paying.",
        "money.actualPrice": "Current price provided by the connected store.",
        "money.pass": "Season Pass",
        "money.passInfo": "Skip all ads until the current event ends.\nAdditional premium reward contents are not yet confirmed.",
        "money.starter": "Starter Bundle",
        "money.special": "Special Bundle",
        "money.bundleUnknown": "The public price is confirmed. Purchase requires the account-specific offer contents to be confirmed.",
        "money.vip": "VIP & Ad Skip",
        "money.vipStatus": "VIP {tier} · {points} points",
        "money.vipTier": "VIP {tier} · {points} points",
        "money.vipBenefit.1": "Automatically unlock and upgrade heroes after prestige",
        "money.vipBenefit.2": "Upgrade all artifacts button",
        "money.vipBenefit.3": "Skip fairy ads",
        "money.vipBenefit.4": "Two additional egg slots",
        "money.vipBenefit.5": "Skip all ads",
        "money.vipPass": "Pass expires: {time}",
        "money.noPass": "No active pass",
        "money.restore": "Restore Purchases",
        "money.retry": "Retry Pending Purchases & Rewards",
        "money.result": "Purchase & Ad Result",
        "money.confirm": "Confirm Purchase",
        "money.confirmBody": "{name}\n{price}\nFinal approval happens in the store payment sheet.",
        "money.purchased": "Purchase verified and rewards delivered.",
        "money.pending": "Payment approval is pending. Use Retry Pending Purchases after approval.",
        "money.cancelled": "Purchase cancelled. You have not been charged.",
        "money.restored": "Store purchases checked. Previously delivered consumables are not granted twice.",
        "money.delivered": "Checked for verified undelivered rewards.",
        "money.busy": "Wait for the current purchase or ad to finish.",
        "money.storeUnavailable": "No payment store is connected to this build. No charge or product grant occurred.",
        "money.adsUnavailable": "The ad service is not connected. No ad-completion reward was granted.",
        "money.verification": "The purchase or ad completion could not be verified. Please retry.",
        "money.expired": "This ad request expired. Start a new request.",
        "money.limit": "You have reached this cycle’s ad reward limit.",
        "money.limitShort": "Limit Reached",
        "money.disabled": "Fairy ad offers are disabled. Enable them in the fairy panel.",
        "money.fairy": "Fairy Gift",
        "money.fairyInfo": "Claim basic gold or view an ad reward. Watching an ad is optional.",
        "money.fairyBonus": "Fairy Ad Rewards",
        "money.adsOn": "Fairy Ad Offers On",
        "money.adsOff": "Fairy Ad Offers Off",
        "money.adPoints": "Rewarded Ads",
        "money.watch": "Watch Ad",
        "money.adRule": "This cycle: {used}/{limit}\nNext reward in {seconds}s",
        "money.optIn": "Complete the ad to earn the reward. Cancellation, no fill, or verification failure does not consume a claim.",
        "money.adStatus.completed": "Ad reward delivered.",
        "money.adStatus.cancelled": "Ad cancelled. Your reward allowance is unchanged.",
        "money.adStatus.no-fill": "No ad is available right now. Try again later.",
        "money.ad.fairy_diamond": "Diamond Fairy",
        "money.adReward.fairy_diamond": "10 diamonds + 15 event tokens\nUp to 5 per day",
        "money.ad.fairy_mana": "Mana Fairy",
        "money.adReward.fairy_mana": "Restore 25% of maximum mana",
        "money.ad.fairy_gold": "Gold Fairy",
        "money.adReward.fairy_gold": "Receive 50× the current titan gold reward",
        "money.ad.fairy_discount": "Discount Fairy",
        "money.adReward.fairy_discount": "90% off master and hero gold costs for 60 seconds",
        "money.ad.fairy_skills": "Spell Fairy",
        "money.adReward.fairy_skills": "Activate selected unlocked spells without spending mana",
        "money.ad.mega_boost": "Mega Boost",
        "money.adReward.mega_boost": "2× all damage for 4 hours",
        "money.ad.shop_chest": "Video Ad Chest",
        "money.adReward.shop_chest": "1 guaranteed equipment · 3 claims per 12 hours"
      });
      Object.assign(translations.ko, {
        "money.ad.fairy_gold_spree": "골드 러시 요정",
        "money.adReward.fairy_gold_spree": "5분 동안 획득 골드 10배",
        "money.ad.fairy_damage_spree": "피해 러시 요정",
        "money.adReward.fairy_damage_spree": "5분 동안 모든 피해 10배",
        "money.ad.fairy_equipment": "대장장이 요정",
        "money.adReward.fairy_equipment": "현재 장비보다 강한 희귀 장비 1개\n최고 스테이지 5,000 미만",
        "money.diamondStage": "다이아 요정은 최고 스테이지의 99% 미만 구간에서 보상을 받을 수 있습니다. 환생 후 다시 확인하세요.",
        "money.adReward.shop_chest": "장비 1개 보장 · 12시간마다 3회\n다음 상자는 5분 후",
        "money.adReward.fairy_diamond": "다이아 10개 + 이벤트 토큰 15개\n하루 5회 · 최고 스테이지 99% 미만"
      });
      Object.assign(translations.en, {
        "money.ad.fairy_gold_spree": "Gold Spree Fairy",
        "money.adReward.fairy_gold_spree": "10× gold earned for 5 minutes",
        "money.ad.fairy_damage_spree": "Damage Spree Fairy",
        "money.adReward.fairy_damage_spree": "10× all damage for 5 minutes",
        "money.ad.fairy_equipment": "Blacksmith Fairy",
        "money.adReward.fairy_equipment": "1 rare equipment stronger than your equipped piece\nAvailable below maximum stage 5,000",
        "money.diamondStage": "Diamond fairy rewards require a stage below 99% of your maximum. Check again after prestige.",
        "money.adReward.shop_chest": "1 guaranteed equipment · 3 per 12 hours\n5 minutes between chests",
        "money.adReward.fairy_diamond": "10 diamonds + 15 event tokens\n5 per day · Below 99% of maximum stage"
      });
      function t(locale, key, args) {
        if (args === void 0) {
          args = {};
        }
        var template = translations[locale][key];
        if (template === undefined) throw Error("Missing localization: " + locale + "/" + key);
        return template.replace(/\{(\w+)\}/g, function (_, k) {
          if (args[k] === undefined) throw Error("Missing placeholder: " + key + "/" + k);
          return String(args[k]);
        });
      }
      Object.assign(translations.ko, {
        "balance.title": "성장 효과 분석",
        "balance.scope": "보석·영혼·연구·기념물",
        "balance.scopeInfo": "이 화면은 해당 성장 계층만 표시합니다. 효과 배율은 독립 구현 수치입니다.",
        "balance.factor": "적용 배율 ×{value}",
        "balance.stat.tap": "탭 피해",
        "balance.stat.hero": "동료 피해",
        "balance.stat.gold": "골드",
        "balance.source.stones": "보석",
        "balance.source.monuments": "기념물",
        "balance.source.titans": "영혼 레벨",
        "balance.source.mystic": "신비 연구",
        "balance.source.research": "금지된 연구"
      });
      Object.assign(translations.en, {
        "balance.title": "Growth Effects",
        "balance.scope": "Gems, Souls, Research & Monuments",
        "balance.scopeInfo": "Only these growth layers are shown. Effect values use independent balance.",
        "balance.factor": "Applied multiplier \xD7{value}",
        "balance.stat.tap": "Tap damage",
        "balance.stat.hero": "Hero damage",
        "balance.stat.gold": "Gold",
        "balance.source.stones": "Gemstones",
        "balance.source.monuments": "Monuments",
        "balance.source.titans": "Soul levels",
        "balance.source.mystic": "Mystic research",
        "balance.source.research": "Forbidden research"
      });
      Object.assign(translations.ko, {
        "art.enemy.0": "뿔 달린 파수병",
        "art.enemy.1": "철갑 거인",
        "art.enemy.2": "외눈 수호자"
      });
      Object.assign(translations.en, {
        "art.enemy.0": "Horned Sentinel",
        "art.enemy.1": "Ironclad Titan",
        "art.enemy.2": "Cyclops Guardian"
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./ExpansionUI.ts', './GameApp.ts', './MonetizationUI.ts', './Amount.ts', './Balance.ts', './Config.ts', './Expansion.ts', './Game.ts', './I18n.ts', './Monetization.ts', './Online.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Monetization.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Amount.ts', './Config.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, mul, add, CONFIG, SPELLS;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      mul = module.mul;
      add = module.add;
    }, function (module) {
      CONFIG = module.CONFIG;
      SPELLS = module.SPELLS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "07624f1KdVPB78MbN40UGTI", "Monetization", undefined);

      /** Prices observed on the Korean iOS listing, 2026-10-02. Never use these as a store charge quote. */
      var PRODUCTS = exports('PRODUCTS', [].concat([180, 500, 1200, 3100, 6500, 14000].map(function (gems, i) {
        return {
          id: "diamonds_" + gems,
          name: 'money.diamonds',
          gems: gems,
          krw: [3300, 7700, 17000, 44000, 77000, 149000][i],
          kind: 'consumable',
          configured: true
        };
      }), [{
        id: 'season_pass',
        name: 'money.pass',
        gems: 0,
        krw: 17000,
        kind: 'season',
        configured: true
      }, {
        id: 'starter_bundle',
        name: 'money.starter',
        gems: 0,
        krw: 4400,
        kind: 'bundle',
        configured: false
      }, {
        id: 'special_small',
        name: 'money.special',
        gems: 0,
        krw: 7700,
        kind: 'bundle',
        configured: false
      }, {
        id: 'special_large',
        name: 'money.special',
        gems: 0,
        krw: 44000,
        kind: 'bundle',
        configured: false
      }]));
      var VIP_THRESHOLDS = exports('VIP_THRESHOLDS', [250, 625, 1250, 1875, 2500]);
      var AD_PLACEMENTS = exports('AD_PLACEMENTS', [{
        id: 'fairy_diamond',
        group: 'fairy',
        limit: 5,
        period: 86400000,
        cooldown: 120000
      }, {
        id: 'fairy_mana',
        group: 'fairy',
        limit: 0,
        period: 86400000,
        cooldown: 120000
      }, {
        id: 'fairy_gold',
        group: 'fairy',
        limit: 0,
        period: 86400000,
        cooldown: 120000
      }, {
        id: 'fairy_discount',
        group: 'legacy',
        limit: 0,
        period: 86400000,
        cooldown: 120000
      }, {
        id: 'fairy_skills',
        group: 'fairy',
        limit: 0,
        period: 86400000,
        cooldown: 300000
      }, {
        id: 'fairy_gold_spree',
        group: 'fairy',
        limit: 0,
        period: 86400000,
        cooldown: 300000
      }, {
        id: 'fairy_damage_spree',
        group: 'fairy',
        limit: 0,
        period: 86400000,
        cooldown: 300000
      }, {
        id: 'fairy_equipment',
        group: 'fairy',
        limit: 0,
        period: 86400000,
        cooldown: 120000
      }, {
        id: 'mega_boost',
        group: 'boost',
        limit: 0,
        period: 86400000,
        cooldown: 14400000
      }, {
        id: 'shop_chest',
        group: 'shop',
        limit: 3,
        period: 43200000,
        cooldown: 300000
      }]);
      var newCommerce = exports('newCommerce', function newCommerce() {
        return {
          vipPoints: 0,
          passUntil: 0,
          discountUntil: 0,
          boostUntil: 0,
          goldSpreeUntil: 0,
          damageSpreeUntil: 0,
          fairyAds: true,
          pending: []
        };
      });

      /** A native StoreKit/Play Billing adapter must return actual store metadata and opaque receipts. */

      var Monetization = exports('Monetization', /*#__PURE__*/function () {
        function Monetization(g, online) {
          this.billing = null;
          this.ads = null;
          this.busy = false;
          this.g = g;
          this.online = online;
        }
        var _proto = Monetization.prototype;
        _proto.tier = function tier() {
          var _this = this;
          return this.g.s.extra.commerce.passUntil > this.g.now() ? 5 : VIP_THRESHOLDS.filter(function (p) {
            return _this.g.s.extra.commerce.vipPoints >= p;
          }).length;
        };
        _proto.apply = function apply(grant) {
          var _this2 = this;
          return this.g.transaction('commerce:' + grant.id, function () {
            _this2.g.require(!_this2.g.s.claims.includes('commerce:' + grant.id), 'error.claimed');
            _this2.g.require(Number.isInteger(grant.gems) && grant.gems >= 0 && Number.isInteger(grant.vipPoints) && grant.vipPoints >= 0, 'error.invalid');
            var x = _this2.g.s.extra.commerce;
            if (grant.kind === 'ad') {
              _this2.g.require(AD_PLACEMENTS.some(function (p) {
                return p.id === grant.placement;
              }), 'error.invalid');
              switch (grant.placement) {
                case 'fairy_diamond':
                  _this2.g.s.eventTokens += 15;
                  _this2.g.s.extra.eventEarned += 15;
                  break;
                case 'fairy_mana':
                  _this2.g.s.run.mana = Math.min(CONFIG.manaMax, _this2.g.s.run.mana + CONFIG.manaMax * .25);
                  break;
                case 'fairy_gold_spree':
                  x.goldSpreeUntil = Math.max(x.goldSpreeUntil || 0, grant.goldSpreeUntil || 0);
                  break;
                case 'fairy_damage_spree':
                  x.damageSpreeUntil = Math.max(x.damageSpreeUntil || 0, grant.damageSpreeUntil || 0);
                  break;
                case 'fairy_equipment':
                  {
                    _this2.g.require(_this2.g.s.maxStage < 5000, 'error.locked');
                    _this2.g.require(_this2.g.s.equipment.length < CONFIG.inventoryCap, 'error.full');
                    var item = _this2.g.drop(undefined, 1),
                      equipped = _this2.g.s.equipment.find(function (e) {
                        return e.id === _this2.g.s.equipped[item.slot];
                      });
                    if (equipped) {
                      item.power = Math.max(item.power, equipped.power * 1.01);
                      item.level = Math.max(item.level, equipped.level + 1);
                    }
                    break;
                  }
                case 'fairy_gold':
                  _this2.g.s.run.gold = add(_this2.g.s.run.gold, mul(_this2.g.goldReward(), 50));
                  break;
                case 'fairy_discount':
                  x.discountUntil = Math.max(x.discountUntil, grant.discountUntil || 0);
                  break;
                case 'fairy_skills':
                  _this2.g.s.spellSlots.forEach(function (i) {
                    if (_this2.g.s.run.master >= SPELLS[i].unlock) {
                      _this2.g.s.run.spells[i] = Math.max(_this2.g.s.run.spells[i], SPELLS[i].duration);
                      _this2.g.s.run.stacks[i] = Math.max(1, _this2.g.s.run.stacks[i]);
                      if (i === 0) _this2.g.damage(mul(_this2.g.tapDamage(), 100 * _this2.g.s.run.spellLevels[i]));
                    }
                  });
                  break;
                case 'mega_boost':
                  x.boostUntil = Math.max(x.boostUntil, grant.boostUntil || 0);
                  break;
                case 'shop_chest':
                  _this2.g.require(_this2.g.s.equipment.length < CONFIG.inventoryCap, 'error.full');
                  _this2.g.drop();
                  break;
              }
            }
            _this2.g.s.gems += grant.gems;
            x.vipPoints += grant.vipPoints;
            x.passUntil = Math.max(x.passUntil, grant.passUntil);
            _this2.g.s.claims.push('commerce:' + grant.id);
          });
        };
        _proto.deliver = /*#__PURE__*/function () {
          var _deliver = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var grants, count, _iterator, _step, grant;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.online.request('/commerce/grants');
                case 2:
                  grants = _context.sent;
                  count = 0;
                  _iterator = _createForOfIteratorHelperLoose(grants);
                case 5:
                  if ((_step = _iterator()).done) {
                    _context.next = 15;
                    break;
                  }
                  grant = _step.value;
                  if (this.g.s.claims.includes('commerce:' + grant.id)) {
                    _context.next = 11;
                    break;
                  }
                  if (this.apply(grant)) {
                    _context.next = 10;
                    break;
                  }
                  throw Error(this.g.notice);
                case 10:
                  count++;
                case 11:
                  _context.next = 13;
                  return this.online.command('/commerce/ack', {
                    id: grant.id
                  }, 'commerce-ack-' + grant.id);
                case 13:
                  _context.next = 5;
                  break;
                case 15:
                  return _context.abrupt("return", count);
                case 16:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function deliver() {
            return _deliver.apply(this, arguments);
          }
          return deliver;
        }();
        _proto.submit = /*#__PURE__*/function () {
          var _submit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(path, data) {
            var x, entry;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  x = this.g.s.extra.commerce, entry = {
                    path: path,
                    data: data
                  };
                  x.pending.push(entry);
                  if (this.g.persist()) {
                    _context2.next = 5;
                    break;
                  }
                  x.pending.pop();
                  throw Error('error.storage');
                case 5:
                  _context2.next = 7;
                  return this.retryPending();
                case 7:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function submit(_x, _x2) {
            return _submit.apply(this, arguments);
          }
          return submit;
        }();
        _proto.retryPending = /*#__PURE__*/function () {
          var _retryPending = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var _this3 = this;
            var _loop, _iterator2, _step2;
            return _regeneratorRuntime().wrap(function _callee3$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                    var entry;
                    return _regeneratorRuntime().wrap(function _loop$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          entry = _step2.value;
                          _context3.next = 3;
                          return _this3.online.command(entry.path, entry.data);
                        case 3:
                          _this3.g.s.extra.commerce.pending = _this3.g.s.extra.commerce.pending.filter(function (p) {
                            return p !== entry;
                          });
                          _this3.g.persist();
                        case 5:
                        case "end":
                          return _context3.stop();
                      }
                    }, _loop);
                  });
                  _iterator2 = _createForOfIteratorHelperLoose(this.g.s.extra.commerce.pending.slice());
                case 2:
                  if ((_step2 = _iterator2()).done) {
                    _context4.next = 6;
                    break;
                  }
                  return _context4.delegateYield(_loop(), "t0", 4);
                case 4:
                  _context4.next = 2;
                  break;
                case 6:
                  _context4.next = 8;
                  return this.deliver();
                case 8:
                case "end":
                  return _context4.stop();
              }
            }, _callee3, this);
          }));
          function retryPending() {
            return _retryPending.apply(this, arguments);
          }
          return retryPending;
        }();
        _proto.purchase = /*#__PURE__*/function () {
          var _purchase = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
            var result;
            return _regeneratorRuntime().wrap(function _callee4$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  if (!this.busy) {
                    _context5.next = 2;
                    break;
                  }
                  throw Error('money.busy');
                case 2:
                  if (PRODUCTS.some(function (p) {
                    return p.id === id && p.configured;
                  })) {
                    _context5.next = 4;
                    break;
                  }
                  throw Error('money.bundleUnknown');
                case 4:
                  if (this.billing) {
                    _context5.next = 6;
                    break;
                  }
                  throw Error('money.storeUnavailable');
                case 6:
                  this.busy = true;
                  _context5.prev = 7;
                  _context5.next = 10;
                  return this.billing.purchase(id);
                case 10:
                  result = _context5.sent;
                  if (!(result.status !== 'purchased')) {
                    _context5.next = 13;
                    break;
                  }
                  return _context5.abrupt("return", result.status);
                case 13:
                  if (result.receipt) {
                    _context5.next = 15;
                    break;
                  }
                  throw Error('money.verification');
                case 15:
                  _context5.next = 17;
                  return this.submit('/commerce/purchase', {
                    product: id,
                    receipt: result.receipt
                  });
                case 17:
                  return _context5.abrupt("return", 'purchased');
                case 18:
                  _context5.prev = 18;
                  this.busy = false;
                  return _context5.finish(18);
                case 21:
                case "end":
                  return _context5.stop();
              }
            }, _callee4, this, [[7,, 18, 21]]);
          }));
          function purchase(_x3) {
            return _purchase.apply(this, arguments);
          }
          return purchase;
        }();
        _proto.watch = /*#__PURE__*/function () {
          var _watch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(placement) {
            var _ticket, result;
            return _regeneratorRuntime().wrap(function _callee5$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  if (!this.busy) {
                    _context6.next = 2;
                    break;
                  }
                  throw Error('money.busy');
                case 2:
                  if (!(placement === 'fairy_diamond' && this.g.s.run.stage >= this.g.s.maxStage * .99)) {
                    _context6.next = 4;
                    break;
                  }
                  throw Error('money.diamondStage');
                case 4:
                  if (!(placement === 'fairy_equipment' && this.g.s.maxStage >= 5000)) {
                    _context6.next = 6;
                    break;
                  }
                  throw Error('error.locked');
                case 6:
                  this.busy = true;
                  _context6.prev = 7;
                  _context6.next = 10;
                  return this.online.command('/commerce/ad/start', {
                    placement: placement
                  });
                case 10:
                  _ticket = _context6.sent;
                  if (!_ticket.skip) {
                    _context6.next = 15;
                    break;
                  }
                  _context6.next = 14;
                  return this.deliver();
                case 14:
                  return _context6.abrupt("return", 'completed');
                case 15:
                  if (this.ads) {
                    _context6.next = 17;
                    break;
                  }
                  throw Error('money.adsUnavailable');
                case 17:
                  _context6.next = 19;
                  return this.ads.show(placement, _ticket.id);
                case 19:
                  result = _context6.sent;
                  if (!(result.status !== 'completed')) {
                    _context6.next = 22;
                    break;
                  }
                  return _context6.abrupt("return", result.status);
                case 22:
                  if (result.proof) {
                    _context6.next = 24;
                    break;
                  }
                  throw Error('money.verification');
                case 24:
                  _context6.next = 26;
                  return this.submit('/commerce/ad/complete', {
                    ticket: _ticket.id,
                    proof: result.proof
                  });
                case 26:
                  return _context6.abrupt("return", 'completed');
                case 27:
                  _context6.prev = 27;
                  this.busy = false;
                  return _context6.finish(27);
                case 30:
                case "end":
                  return _context6.stop();
              }
            }, _callee5, this, [[7,, 27, 30]]);
          }));
          function watch(_x4) {
            return _watch.apply(this, arguments);
          }
          return watch;
        }();
        _proto.restore = /*#__PURE__*/function () {
          var _restore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            var _iterator3, _step3, receipt;
            return _regeneratorRuntime().wrap(function _callee6$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  if (!this.busy) {
                    _context7.next = 2;
                    break;
                  }
                  throw Error('money.busy');
                case 2:
                  if (this.billing) {
                    _context7.next = 4;
                    break;
                  }
                  throw Error('money.storeUnavailable');
                case 4:
                  this.busy = true;
                  _context7.prev = 5;
                  _context7.t0 = _createForOfIteratorHelperLoose;
                  _context7.next = 9;
                  return this.billing.restore();
                case 9:
                  _context7.t1 = _context7.sent;
                  _iterator3 = (0, _context7.t0)(_context7.t1);
                case 11:
                  if ((_step3 = _iterator3()).done) {
                    _context7.next = 17;
                    break;
                  }
                  receipt = _step3.value;
                  _context7.next = 15;
                  return this.submit('/commerce/restore', {
                    receipt: receipt
                  });
                case 15:
                  _context7.next = 11;
                  break;
                case 17:
                  _context7.next = 19;
                  return this.retryPending();
                case 19:
                  _context7.prev = 19;
                  this.busy = false;
                  return _context7.finish(19);
                case 22:
                case "end":
                  return _context7.stop();
              }
            }, _callee6, this, [[5,, 19, 22]]);
          }));
          function restore() {
            return _restore.apply(this, arguments);
          }
          return restore;
        }();
        return Monetization;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MonetizationUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Monetization.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, PRODUCTS, VIP_THRESHOLDS, AD_PLACEMENTS;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PRODUCTS = module.PRODUCTS;
      VIP_THRESHOLDS = module.VIP_THRESHOLDS;
      AD_PLACEMENTS = module.AD_PLACEMENTS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "815d12yMuxKj65Sdc0agPDg", "MonetizationUI", undefined);
      var MonetizationUI = exports('MonetizationUI', /*#__PURE__*/function () {
        function MonetizationUI(a, model) {
          this.quotes = [];
          this.a = a;
          this.model = model;
        }
        var _proto = MonetizationUI.prototype;
        _proto.tr = function tr(key, args) {
          if (args === void 0) {
            args = {};
          }
          return this.a.tr(key, args);
        };
        _proto.price = function price(id) {
          var quote = this.quotes.find(function (q) {
            return q.id === id;
          });
          return (quote == null ? void 0 : quote.price) || '₩' + PRODUCTS.find(function (p) {
            return p.id === id;
          }).krw.toLocaleString('ko-KR');
        };
        _proto.run = /*#__PURE__*/function () {
          var _run = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(work) {
            var key;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return this.a.onlineService.connect(this.tr('online.defaultName'));
                case 3:
                  _context.next = 5;
                  return work();
                case 5:
                  _context.next = 11;
                  break;
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  key = _context.t0.message;
                  this.a.info(this.tr('money.result'), this.tr(/^(money|error|online)\./.test(key) ? key : 'money.verification'));
                case 11:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[0, 7]]);
          }));
          function run(_x) {
            return _run.apply(this, arguments);
          }
          return run;
        }();
        _proto.rows = function rows() {
          var _this = this;
          return PRODUCTS.filter(function (p) {
            return p.kind === 'consumable';
          }).map(function (p) {
            return {
              title: _this.tr(p.name, {
                count: p.gems
              }),
              sub: _this.tr('money.packInfo', {
                count: p.gems
              }),
              action: _this.price(p.id),
              click: function click() {
                return _this.product(p.id);
              },
              icon: 4
            };
          });
        };
        _proto.store = function store() {
          var _this2 = this;
          void this.run( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var status;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  if (!_this2.model.billing) {
                    _context4.next = 4;
                    break;
                  }
                  _context4.next = 3;
                  return _this2.model.billing.catalog(PRODUCTS.map(function (p) {
                    return p.id;
                  }));
                case 3:
                  _this2.quotes = _context4.sent;
                case 4:
                  _context4.next = 6;
                  return _this2.a.onlineService.request('/commerce/status');
                case 6:
                  status = _context4.sent;
                  _this2.a.extensions.list('money.store', [{
                    title: _this2.tr('money.balance', {
                      count: _this2.a.game.s.gems
                    }),
                    sub: _this2.tr('money.priceRegion')
                  }].concat(_this2.rows(), PRODUCTS.filter(function (p) {
                    return p.kind !== 'consumable';
                  }).map(function (p) {
                    return {
                      title: _this2.tr(p.name),
                      sub: _this2.tr(p.configured ? 'money.passInfo' : 'money.bundleUnknown'),
                      action: _this2.price(p.id),
                      click: function click() {
                        return _this2.product(p.id);
                      }
                    };
                  }), [{
                    title: _this2.tr('money.vip'),
                    sub: _this2.tr('money.vipStatus', {
                      tier: status.tier,
                      points: status.vipPoints
                    }),
                    action: _this2.tr('action.details'),
                    click: function click() {
                      return _this2.vip();
                    }
                  }, {
                    title: _this2.tr('money.restore'),
                    action: _this2.tr('action.apply'),
                    click: function click() {
                      void _this2.run( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                          while (1) switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return _this2.model.restore();
                            case 2:
                              _this2.result('money.restored');
                            case 3:
                            case "end":
                              return _context2.stop();
                          }
                        }, _callee2);
                      })));
                    }
                  }, {
                    title: _this2.tr('money.retry'),
                    action: _this2.tr('action.apply'),
                    click: function click() {
                      void _this2.run( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                          while (1) switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.next = 2;
                              return _this2.model.retryPending();
                            case 2:
                              _this2.result('money.delivered');
                            case 3:
                            case "end":
                              return _context3.stop();
                          }
                        }, _callee3);
                      })));
                    }
                  }]));
                case 8:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          })));
        };
        _proto.product = function product(id) {
          var _this3 = this;
          var product = PRODUCTS.find(function (p) {
            return p.id === id;
          });
          var p = this.a.open(this.tr(product.name, {
              count: product.gems
            }), 580),
            quote = this.quotes.find(function (q) {
              return q.id === id;
            });
          this.a.label(p, this.price(id), 0, 165, 370, 60, 34, '#ecc071');
          this.a.label(p, this.tr(product.kind === 'consumable' ? 'money.packInfo' : product.configured ? 'money.passInfo' : 'money.bundleUnknown', {
            count: product.gems
          }), 0, 70, 370, 110, 20);
          this.a.label(p, this.tr(quote ? 'money.actualPrice' : 'money.priceRegion'), 0, -40, 370, 75, 15);
          this.a.button(p, this.tr('action.buy'), 0, -140, 370, 55, function () {
            if (!product.configured) {
              _this3.result('money.bundleUnknown');
              return;
            }
            _this3.a.confirm(_this3.tr('money.confirm'), _this3.tr('money.confirmBody', {
              name: _this3.tr(product.name, {
                count: product.gems
              }),
              price: _this3.price(id)
            }), function () {
              void _this3.run( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
                var state;
                return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return _this3.model.purchase(id);
                    case 2:
                      state = _context5.sent;
                      _this3.result('money.' + state);
                      _this3.a.drawPanel();
                    case 5:
                    case "end":
                      return _context5.stop();
                  }
                }, _callee5);
              })));
            });
          }, true);
          this.a.button(p, this.tr('money.vip'), 0, -220, 370, 42, function () {
            return _this3.vip();
          });
        };
        _proto.result = function result(key) {
          this.a.info(this.tr('money.result'), this.tr(key));
          this.a.updateHUD();
        };
        _proto.vip = function vip() {
          var _this4 = this;
          void this.run( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            var s;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return _this4.a.onlineService.request('/commerce/status');
                case 2:
                  s = _context6.sent;
                  _this4.a.extensions.list('money.vip', [{
                    title: _this4.tr('money.vipStatus', {
                      tier: s.tier,
                      points: s.vipPoints
                    }),
                    sub: _this4.tr('money.vipPass', {
                      time: s.passUntil > Date.now() ? new Date(s.passUntil).toLocaleString(_this4.a.game.s.locale) : _this4.tr('money.noPass')
                    })
                  }].concat(VIP_THRESHOLDS.map(function (points, i) {
                    return {
                      points: points,
                      i: i
                    };
                  }).filter(function (v) {
                    return v.i === 2 || v.i === 4;
                  }).map(function (_ref6) {
                    var points = _ref6.points,
                      i = _ref6.i;
                    return {
                      title: _this4.tr('money.vipTier', {
                        tier: i + 1,
                        points: points
                      }),
                      sub: _this4.tr('money.vipBenefit.' + (i + 1)),
                      action: _this4.tr(s.tier > i ? 'action.selected' : 'error.locked')
                    };
                  })));
                case 4:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          })));
        };
        _proto.fairy = function fairy() {
          var _this5 = this;
          var p = this.a.open(this.tr('money.fairy'), 500);
          this.a.label(p, this.tr('money.fairyInfo'), 0, 120, 370, 130, 20);
          this.a.button(p, this.tr('action.claim'), 0, 10, 370, 55, function () {
            return _this5.a.act(function () {
              return _this5.a.game.claimFairy(_this5.a.id('fairy'));
            }, function () {
              return _this5.a.close();
            });
          }, true);
          this.a.button(p, this.tr('money.fairyBonus'), 0, -75, 370, 55, function () {
            return _this5.ads('fairy');
          });
          this.a.button(p, this.tr(this.a.game.s.extra.commerce.fairyAds ? 'money.adsOn' : 'money.adsOff'), 0, -163, 370, 45, function () {
            _this5.a.game.s.extra.commerce.fairyAds = !_this5.a.game.s.extra.commerce.fairyAds;
            _this5.a.game.persist();
            _this5.fairy();
          });
        };
        _proto.ads = function ads(group) {
          var _this6 = this;
          if (group === 'fairy' && !this.a.game.s.extra.commerce.fairyAds) {
            this.result('money.disabled');
            return;
          }
          void this.run( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            var s;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return _this6.a.onlineService.request('/commerce/status');
                case 2:
                  s = _context7.sent;
                  _this6.a.extensions.list('money.adPoints', s.placements.filter(function (p) {
                    return !group || p.group === group;
                  }).map(function (p) {
                    return {
                      title: _this6.tr('money.ad.' + p.id),
                      sub: _this6.tr('money.adReward.' + p.id),
                      action: _this6.tr(p.limit && p.used >= p.limit ? 'money.limitShort' : p.skip ? 'action.claim' : 'money.watch'),
                      click: function click() {
                        return _this6.ad(p.id, p);
                      }
                    };
                  }));
                case 4:
                case "end":
                  return _context7.stop();
              }
            }, _callee7);
          })));
        };
        _proto.ad = function ad(id, status) {
          var _this7 = this;
          var p = this.a.open(this.tr('money.ad.' + id), 550),
            rule = AD_PLACEMENTS.find(function (p) {
              return p.id === id;
            });
          this.a.label(p, this.tr('money.adReward.' + id), 0, 150, 370, 110, 21);
          this.a.label(p, this.tr('money.adRule', {
            used: (status == null ? void 0 : status.used) || 0,
            limit: rule.limit || '∞',
            seconds: Math.max(0, Math.ceil((((status == null ? void 0 : status.readyAt) || 0) - Date.now()) / 1000))
          }), 0, 35, 370, 80, 17);
          this.a.label(p, this.tr('money.optIn'), 0, -50, 370, 65, 15);
          this.a.button(p, this.tr(status != null && status.skip ? 'action.claim' : 'money.watch'), 0, -146, 370, 55, function () {
            if ((id === 'shop_chest' || id === 'fairy_equipment') && _this7.a.game.s.equipment.length >= 100) {
              _this7.result('error.full');
              return;
            }
            void _this7.run( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
              var result;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return _this7.model.watch(id);
                  case 2:
                    result = _context8.sent;
                    _this7.result('money.adStatus.' + result);
                    _this7.a.drawPanel();
                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            })));
          }, true);
          this.a.button(p, this.tr('action.cancel'), 0, -218, 370, 43, function () {
            return _this7.a.close();
          });
        };
        return MonetizationUI;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Online.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, _extends, cclegacy;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c6a192EHo9P4JoeCSc1PtlZ", "Online", undefined);
      /** Development online service. Local-only endpoint; no production credentials. */
      var Online = exports('Online', /*#__PURE__*/function () {
        function Online(storage) {
          this.base = 'http://127.0.0.1:8788/api';
          this.token = '';
          this.accountId = '';
          this.storage = storage;
          this.token = storage.getItem('ember-online-token') || '';
          this.accountId = storage.getItem('ember-online-id') || '';
        }
        var _proto = Online.prototype;
        _proto.request = /*#__PURE__*/function () {
          var _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(path, data) {
            var controller, timer, r, result;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  controller = new AbortController(), timer = setTimeout(function () {
                    return controller.abort();
                  }, 8000);
                  _context.prev = 1;
                  _context.next = 4;
                  return fetch(this.base + path, _extends({
                    method: data ? 'POST' : 'GET',
                    headers: _extends({
                      'Content-Type': 'application/json'
                    }, this.token ? {
                      Authorization: "Bearer " + this.token
                    } : {})
                  }, data ? {
                    body: JSON.stringify(data)
                  } : {}, {
                    signal: controller.signal
                  }));
                case 4:
                  r = _context.sent;
                  _context.next = 7;
                  return r.json();
                case 7:
                  result = _context.sent;
                  if (r.ok) {
                    _context.next = 10;
                    break;
                  }
                  throw Error(result.error || 'online.serverError');
                case 10:
                  return _context.abrupt("return", result);
                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](1);
                  if (!(_context.t0.message.startsWith('online.') || _context.t0.message.startsWith('error.') || _context.t0.message.startsWith('extra.') || _context.t0.message.startsWith('money.'))) {
                    _context.next = 17;
                    break;
                  }
                  throw _context.t0;
                case 17:
                  throw Error('online.unreachable');
                case 18:
                  _context.prev = 18;
                  clearTimeout(timer);
                  return _context.finish(18);
                case 21:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[1, 13, 18, 21]]);
          }));
          function request(_x, _x2) {
            return _request.apply(this, arguments);
          }
          return request;
        }();
        _proto.recover = /*#__PURE__*/function () {
          var _recover = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(token, accountId) {
            var previous, boot;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  previous = this.token;
                  this.token = token;
                  _context2.prev = 2;
                  _context2.next = 5;
                  return this.request('/bootstrap');
                case 5:
                  boot = _context2.sent;
                  if (!(boot.profile.id !== accountId)) {
                    _context2.next = 8;
                    break;
                  }
                  throw Error('online.auth');
                case 8:
                  this.storage.setItem('ember-online-token', token);
                  this.storage.setItem('ember-online-id', accountId);
                  this.accountId = accountId;
                  this.storage.setItem('ember-online-pending', '{}');
                  _context2.next = 18;
                  break;
                case 14:
                  _context2.prev = 14;
                  _context2.t0 = _context2["catch"](2);
                  this.token = previous;
                  throw _context2.t0;
                case 18:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this, [[2, 14]]);
          }));
          function recover(_x3, _x4) {
            return _recover.apply(this, arguments);
          }
          return recover;
        }();
        _proto.connect = /*#__PURE__*/function () {
          var _connect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(name) {
            var account;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (this.token) {
                    _context3.next = 8;
                    break;
                  }
                  _context3.next = 3;
                  return this.request('/account', {
                    name: name
                  });
                case 3:
                  account = _context3.sent;
                  this.token = account.token;
                  this.accountId = account.id;
                  this.storage.setItem('ember-online-token', this.token);
                  this.storage.setItem('ember-online-id', this.accountId);
                case 8:
                  return _context3.abrupt("return", this.request('/bootstrap'));
                case 9:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function connect(_x5) {
            return _connect.apply(this, arguments);
          }
          return connect;
        }();
        _proto.command = /*#__PURE__*/function () {
          var _command = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(path, data, explicitKey) {
            var fingerprint, pending, saved, key, result;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  if (data === void 0) {
                    data = {};
                  }
                  fingerprint = path + JSON.stringify(data);
                  pending = {};
                  try {
                    saved = JSON.parse(this.storage.getItem('ember-online-pending') || '{}');
                    if (saved && typeof saved === 'object' && !Array.isArray(saved)) pending = saved;
                  } catch (_unused) {}
                  key = explicitKey || pending[fingerprint] || "tx-" + Date.now() + "-" + Math.random().toString(36).slice(2);
                  pending[fingerprint] = key;
                  this.storage.setItem('ember-online-pending', JSON.stringify(pending));
                  _context4.prev = 8;
                  _context4.next = 11;
                  return this.request(path, _extends({}, data, {
                    key: key
                  }));
                case 11:
                  result = _context4.sent;
                  delete pending[fingerprint];
                  this.storage.setItem('ember-online-pending', JSON.stringify(pending));
                  return _context4.abrupt("return", result);
                case 17:
                  _context4.prev = 17;
                  _context4.t0 = _context4["catch"](8);
                  if (_context4.t0.message !== 'online.unreachable') {
                    delete pending[fingerprint];
                    this.storage.setItem('ember-online-pending', JSON.stringify(pending));
                  }
                  throw _context4.t0;
                case 21:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this, [[8, 17]]);
          }));
          function command(_x6, _x7, _x8) {
            return _command.apply(this, arguments);
          }
          return command;
        }();
        return Online;
      }());
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map