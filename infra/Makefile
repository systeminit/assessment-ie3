earthly_flags = --allow-privileged \
	--secret FLY_API_TOKEN \
	--secret AWS_ACCESS_KEY_ID \
	--secret AWS_SECRET_ACCESS_KEY

earthly_build_args = --AWS_REGION=$(AWS_REGION) \
	--AWS_S3_ENDPOINT=$(AWS_S3_ENDPOINT)

.PHONY: diff
diff:
	earthly $(earthly_flags) +diff $(earthly_build_args)

.PHONY: deploy
deploy:
	earthly $(earthly_flags) +deploy $(earthly_build_args)

.PHONY: deploy
destroy:
	earthly $(earthly_flags) +destroy $(earthly_build_args)
