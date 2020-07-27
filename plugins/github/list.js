var githubListURL = "https://api.github.com/users/%USER%/repos"
var containerRepo = document.getElementById('repos');

if (containerRepo) {
  var githubUser = containerRepo.dataset.githubUser;
  getRepositories(githubUser, populateRepositoryResults);
}

function getRepositories(githubUser, onSuccess) {
  var url = githubListURL.replace("%USER%", containerRepo.dataset.githubUser);
  $.get(url, onSuccess)
}

function populateRepositoryResults(repos) {
  repos.forEach(function (value) {
    var template = $('#repo-template').html();
    var lastUpdated = Date.parse(value.updated_at);
    var diff = Math.round(Math.abs((Date.now() - lastUpdated) / (24 * 60 * 60 * 1000)));
    var updated = diff > 30
      ? new Date(lastUpdated).toUTCString()
      : diff + " days ago"
    var data = {
      name: value.name,
      description: value.description,
      link: value.html_url,
      license: value.license.spdx_id,
      stars: value.stargazers_count,
			stargazers: value.html_url + "/stargazers",
      forks: value.forks_count,
			forks_url: value.html_url + "/network/members",
      issues: value.open_issues_count,
      issues_url: value.html_url + "/issues",
      updated: updated,
    };
    var output = render(template, data);
    $('#repos').append(output);
  });
}
