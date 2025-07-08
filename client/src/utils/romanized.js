import { rules } from "./rules"


export const convertRomanToUnicode=(input)=>{
    const output = input;
  const rulesPair = [];
  for (let i = 0; i <= rules.length; i += 1) {
    rulesPair.push({ key: rules[i], value: rules[i + 1] });
  }
  for(const rule of rulesPair){
    while(output.includes(rule.key)){
        output = output.replace(rule.key, rule.value);
    }
  }
  return output

}

convertRomanToUnicode(kh)