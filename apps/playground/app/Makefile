default: fmt

clean:
	pnpm i \
	&& cd ios \
	&& pod install \
	&& cd ../android \
	&& rm -rf app/.cxx \
	&& ./gradlew clean;

clean_deep:
	make -Bs clean_deep_rm \
	&& pnpm i \
	&& cd ios \
	&& xcodebuild clean -quiet \
	&& pod cache clean --all \
	&& pod deintegrate \
	&& pod install --repo-update \
	&& cd ../android \
	&& ./gradlew clean;

clean_deep_rm:
	rm -rf node_modules ios/build ios/Pods ~/Library/Developer/Xcode/DerivedData/* android/.gradle android/app/.cxx android/build ~/.gradle/caches ~/.gradle/daemon $$TMPDIR/react-native* $$TMPDIR/metro* $$TMPDIR/haste-map*;

extract:
	export NEXT_PUBLIC_MINIFY_CLASS_NAMES=1 \
	&& node -r ./z/register ./z/babel-extract;

tw:
	export NEXT_PUBLIC_MINIFY_CLASS_NAMES=1 \
	&& node -r ./z/register ./z/babel-extract;
