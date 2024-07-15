(function() {
    const dependencies = document.querySelectorAll(".dependency");

    const modData = Array.from(dependencies).map(dependency => {
        const embeddedString = " is embedded";
        const versionString = " Version ";

        return Array.from(dependency.querySelectorAll("a")).map(info => {
            const link = info.href;
            const title = info.querySelector(".project-title")?.textContent?.trim() || "";
            let version = info.querySelector(".dep-type")?.textContent || "";

            if (version.startsWith(versionString))
                version = version.slice(versionString.length);

            if (version.endsWith(embeddedString))
                version = version.slice(0, -embeddedString.length);

            return { link, title, version };
        });
    })

    const flattenedData = modData.flat();

    const maxLinkLength = Math.max(...flattenedData.map(({ link, title }) => `[${title}](${link})`.length), 4);
    const maxVersionLength = Math.max(...flattenedData.map(({ version }) => version.length), 7);

    let markdownTable = `| ${"Mod".padEnd(maxLinkLength)} | ${"Version".padEnd(maxVersionLength)} |\n`;
    markdownTable += `|${"-".repeat(maxLinkLength + 2)}|${"-".repeat(maxVersionLength + 2)}|\n`;

    flattenedData.forEach(({ link, title, version }) => {
        const formattedLink = `[${title}](${link})`;
        markdownTable += `| ${formattedLink.padEnd(maxLinkLength)} | ${version.padEnd(maxVersionLength)} |\n`;
    });

    console.log(markdownTable);
})();
