function main() {
    const passportsDom = document.querySelector('.passports');
    for (let region of Object.keys(data.region)) {
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

        const passport = needsDom.querySelector(':checked');
        const need = needsDom.querySelector(':checked').value;

        const statusSuitableByCountry = {};
        for (let countryName of Object.keys(data.region)) {
            const country = data.region[countryName];
            const statusSuitable = [];
            for (let statusName of Object.keys(country.status)) {
                const status = country.status[statusName];
                if (status.rights.includes(need)) {
                    statusSuitable.push(status);
                }
            }
            statusSuitableByCountry[countryName] = statusSuitable;
        }

        console.log(statusSuitableByCountry);

    };
}

main();
