package hypetask.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import hypetask.model.Common;
import hypetask.repository.CommonRepository;

@Service
public class CommonService {

	Gson json = new Gson();

	@Autowired
	private CommonRepository commonRepository;

	public List<Common> getAllCommon() {
		return commonRepository.findAll();
	}

	public void createCommon(Common Common) {
		commonRepository.save(Common);
	}

	public Common getCommonById(String id) {
		return commonRepository.findById(id).get();
	}
}
