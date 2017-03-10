const LANG = 'en';

function main() {

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

        const need = needsDom.querySelector(':checked').value;

        const statusSuitableByCountry = getSuitableStatusByCountry(need);

        let message = '';

        for (let countryName of Object.keys(statusSuitableByCountry)) {
            message += `You can go to ${countryName} and `;
            message += `get one of these status: ${statusSuitableByCountry[countryName].map(node => node.name[LANG]).join(', ')}. `;
            message += `Here's how.`;
        }


        document.querySelector('.message').innerHTML = message;

    };
}

function getSuitableStatusByCountry(need) {
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

    return statusSuitableByCountry;
}

main();
