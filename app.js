import terminalAsker from 'terminal_asker';

import siblingFolderReader from 'sibling_folder_reader';

import githubManager from 'github_manager';

import repositoryCloner from 'repository_cloner';

import packageConfigurer from 'package_configurer';

export default async function () {
  try {
    const packageName = await terminalAsker('packageName');
    const packageDesc = await terminalAsker('packageDesc');

    console.log(packageName);

    const siblingFolders = await siblingFolderReader();

    if (siblingFolders.includes(packageName)) {
      throw new Error(
        'Package already exists with the specified package name. Please choose a different package name.'
      );
    } else {
      const { html_url } = await githubManager('create', [
        packageName,
        packageDesc,
      ]);

      await repositoryCloner(html_url, packageName);
      await packageConfigurer(packageName, packageDesc, html_url);
      console.log('Package_Creator has successfully created the package:');
      console.log(packageName);
    }
  } catch (error) {
    console.error('Package_Creator encountered an error:');
    console.error(error);
  }
}
