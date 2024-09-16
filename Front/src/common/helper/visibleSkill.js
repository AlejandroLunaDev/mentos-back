export default function visibleSkill(skills,num) {
    // Calcular el promedio de puntajes
    let totalChars = 0;
    const visible = [];
    let remaining = 0;

    for (let i = 0; i < skills.length; i++) {
      const skillLength = skills[i].length;

      if (totalChars + skillLength > num) {
        remaining = skills.length - i;
        break;
      }

      totalChars += skillLength;
      visible.push(skills[i]);
    }
    return ({visible, remaining})

}
