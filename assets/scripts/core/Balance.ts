// Reference discovery costs: TT2_CSV snapshot 2026-10-02. Other effect coefficients are independent.
export const BALANCE_VERSION = 'chapter1-2026-10-02';
export const ARTIFACT_DISCOVERY_COSTS = [1.000E+00,3.000E+00,6.000E+00,1.100E+01,1.900E+01,3.000E+01,4.600E+01,6.900E+01,1.020E+02,1.480E+02,2.140E+02,3.060E+02,4.340E+02,6.130E+02,8.610E+02,1.200E+03,1.680E+03,2.320E+03,3.210E+03,4.430E+03,6.090E+03,8.360E+03,1.150E+04,1.570E+04,2.140E+04,2.910E+04,3.960E+04,5.380E+04,7.300E+04,9.890E+04,1.340E+05,1.810E+05,2.450E+05,3.300E+05,4.450E+05,6.000E+05,8.080E+05,1.090E+06,1.460E+06,1.960E+06,2.800E+06,4.270E+06,6.550E+06,1.010E+07,1.560E+07,2.430E+07,3.800E+07,5.970E+07,9.430E+07,2.539E+08,7.615E+08,2.487E+09,8.625E+09,3.155E+10,1.207E+11,4.788E+11,1.957E+12,8.281E+12,3.550E+13,1.518E+14,6.520E+14,2.817E+15,1.223E+16,5.300E+16,2.311E+17,4.831E+18,1.008E+20,2.115E+21,4.456E+22,9.399E+23,1.999E+25,4.252E+26,9.082E+27,1.950E+29,4.195E+30,9.042E+31,1.970E+33,4.269E+34,9.313E+35,1.225E+38,1.078E+40,1.418E+42,8.818E+43,5.157E+45,2.363E+47,8.931E+48,3.074E+50,9.947E+51,3.099E+53,7.899E+54,1.016E+57,1.226E+59,1.327E+61,3.465E+62,8.722E+63,2.076E+65,4.497E+66,8.152E+67,8.499E+68,8.526E+69,9.395E+70,2.032E+72,4.279E+73,8.736E+74,1.667E+76,2.842E+77,5.040E+78,4.940E+80,4.860E+82,4.790E+84,7.860E+86,1.330E+89,2.260E+91,3.870E+93,6.630E+95,1.140E+98,1.970E+100,3.430E+102,5.970E+104,1.050E+107,1.840E+109,3.240E+111,5.750E+113,1.020E+116,1.830E+118,3.280E+120,5.900E+122,1.070E+125,1.940E+127,3.530E+129,6.460E+131,1.190E+134,2.190E+136,4.050E+138,7.530E+140,1.400E+143,2.630E+145,4.950E+147,9.340E+149,1.770E+152,3.370E+154,6.430E+156,1.230E+159,2.370E+161,4.580E+163,8.880E+165,1.730E+168,3.370E+170,6.620E+172,1.300E+175,2.550E+177,5.010E+179,9.840E+181,6.860E+184,8.200E+187,9.810E+190,1.180E+194,1.410E+197,1.690E+200,2.030E+203,2.440E+206,2.930E+209,3.520E+212,4.233E+215,5.093E+218,6.138E+221,7.399E+224,8.929E+227,1.078E+231,1.302E+234,1.575E+237,1.904E+240,2.305E+243,2.790E+246,3.380E+249,4.100E+252,4.973E+255,6.035E+258,7.328E+261,8.909E+264,1.083E+268,1.319E+271,1.607E+274,1.959E+277,2.390E+280,2.918E+283,3.567E+286,4.361E+289,5.335E+292,6.535E+295,8.005E+298,9.810E+301,1.203E+305,1.477E+308] as const;
export type GrowthStat = 'tap' | 'hero' | 'gold';
export const GROWTH_STATS:GrowthStat[]=['tap','hero','gold'];
export const GEM_BREAKPOINTS=[100,200,400,500] as const;
export function gemstoneRarity(level:number):number {return GEM_BREAKPOINTS.filter(n=>level>=n).length;}
// Reference rarity table unlocks 1,1,2,3,4 bonus slots. Stable ID routing below is independent.
export function gemstoneSlots(level:number):number{return level<=0?0:[1,1,2,3,4][gemstoneRarity(level)];}
export const GEM_EFFECTS=Array.from({length:24},(_,id)=>({id,primary:GROWTH_STATS[id%3],secondary:[GROWTH_STATS[(id+1)%3],GROWTH_STATS[(id+2)%3],GROWTH_STATS[id%3]]}));
export interface GrowthContribution {source:string; log:number;}
export function gemstoneBonus(id:number,level:number,stat:GrowthStat):number {
 const def=GEM_EFFECTS[id];if(!def||level<=0)return 0;
 let bonus=def.primary===stat?Math.log10(1+level*.025):0;
 for(let slot=0;slot<gemstoneSlots(level)-1;slot++)if(def.secondary[slot]===stat)bonus+=Math.log10(1+level*.01);
 return bonus;
}
export function routedBonus(levels:number[],stat:GrowthStat,rate:number,logarithmic=false):number {
 return levels.reduce((sum,level,id)=>sum+(GROWTH_STATS[id%3]===stat?(logarithmic?Math.log10(1+level*rate):level*rate):0),0);
}
