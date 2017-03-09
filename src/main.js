function main() {
    const passportsDom = document.querySelector('.passports');
    for (let region of data.region) {
        passportsDom.innerHTML += `
            <label>
              <input type="radio" name="passports" value="${region}" />
              ${region}
            </label>
        `;
    }

    const needsDom = document.querySelector('.needs');
    for (let right of data.common.rights) {
        needsDom.innerHTML += `
            <label>
                <input type="radio" name="needs" value="${right}" />
                ${right}
            </label>
        `;
    }

    document.querySelector('.button_search').onclick = () => {
    };
}

main();
