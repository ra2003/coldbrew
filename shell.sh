#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DIST_DIR=${1:-dist}  

(
  cd $DIR;
  if docker pull "registry.gitlab.com/plasticity/coldbrew/builder:$(python3 -c "import version; print(version.__version__)")"; then
      echo "Using remote pre-built Coldbrew Docker image...";
      docker tag "registry.gitlab.com/plasticity/coldbrew/builder:$(python3 -c "import version; print(version.__version__)")" "coldbrew:latest";
      docker rmi "registry.gitlab.com/plasticity/coldbrew/builder:$(python3 -c "import version; print(version.__version__)")";
      mkdir -p $(pwd)/cache;
      docker run --rm -it -v $(pwd)/cache:/root/.emscripten_cache/  -v $(pwd)/customize:/BUILD/customize -v $(pwd)/${DIST_DIR}:/BUILD/${DIST_DIR} -v $(pwd)/installs/python-3.8.0/lib/libpython3.5:/BUILD/installs/python-3.8.0/lib/libpython3.5 -v $(pwd)/installs/python-3.8.0/lib/linked:/BUILD/installs/python-3.8.0/lib/linked -v $(pwd)/src:/BUILD/src -v $(pwd)/third_party:/BUILD/third_party coldbrew:latest /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; source /root/.cargo/env; cp -p /root/.emscripten /root/.emscripten_cache/.emscripten; export EM_CONFIG=/root/.emscripten_cache/.emscripten; cd /BUILD/; /bin/bash";
  else
      echo "Using locally built Coldbrew Docker image...";
      docker build . -t coldbrew:latest;
      mkdir -p $(pwd)/cache;
      docker run --rm -it -v $(pwd):/BUILD -v $(pwd)/cache:/root/.emscripten_cache/ coldbrew:latest /bin/bash -c "cd /usr/local/coldbrew/emsdk; source ./emsdk_env.sh; source /root/.cargo/env; cp -p /root/.emscripten /root/.emscripten_cache/.emscripten; export EM_CONFIG=/root/.emscripten_cache/.emscripten; cd /BUILD/; /bin/bash";
  fi
)