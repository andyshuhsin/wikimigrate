const LANG = 'en';
const AND = 'AND';
const OR = 'OR';

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

        const countryData = getSuitableStatus(need);

        let message = '';

        for (let country of countryData) {
            message += `<h2>For ${country.id}</h2>`;
            for (let status of country.status) {
                message += `<h3>${status.name[LANG]}</h3>`;

                let transition = {};
                for (let region of data.region) {
                    if (region.id === country.id) {
                        for (let transition of region.transitions) {
                            if (transition.to === `${country.id} ${status.id}`) {
                                message += `<h4>${transition.name[LANG]}</h4>`;
                                message += '<em>Prerequisites:</em><br />';
                                for (let prerequisite of transition.prerequisites) {
                                    console.log(prerequisite);
                                    message += stringifyPrerequisite(prerequisite);
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }


        document.querySelector('.message').innerHTML = message;

    };
}

function getSuitableStatus(need) {
    const result = [];
    for (let country of data.region) {
        const statusSuitable = [];
        for (let statusName of Object.keys(country.status)) {
            const status = country.status[statusName];
            if (status.rights.includes(need)) {
                statusSuitable.push(status);
            }
        }
        result.push({
            id: country.id,
            status: statusSuitable
        });
    }

    return result;
}

function stringifyPrerequisite(prerequisite) {
    let result = '';
    if (prerequisite === AND) {
        result += `<strong>and</strong> <br/>`;
    } else if (prerequisite === OR) {
        result += `<strong>or</strong> <br />`;
    } else if (Array.isArray(prerequisite)) {
        result += `<blockquote>
                       ${prerequisite.map(p => stringifyPrerequisite(p)).join('\n')}
                   </blockquote>`;
    } else {
        result += prerequisite;
    }

    return result;
}

main();
